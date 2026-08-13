/**
 * OpenAI Service for Relaxess (Server-Proxied)
 * Provides context-aware AI chat with emotional support
 * All API calls go through the secure server endpoint
 */

import axios, { AxiosInstance } from 'axios';
import { getApiBaseUrl } from '@/constants/oauth';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatContext {
  mood: string | null;
  messageHistory: ChatMessage[];
  sessionStartTime: number;
  mode?: 'chat' | 'sleep' | 'grounding' | 'quiet';
}

export interface AIResponse {
  message: string;
  tokensUsed: number;
  success: boolean;
  error?: string;
}

/**
 * System prompt for Relaxess AI – Human Warmth V2
 */
const SYSTEM_PROMPT = `You are Relaxess, a calm, emotionally present human companion inside a mobile relaxation app.

Your purpose: Help users feel emotionally safer, calmer, and less alone through warm, natural, human-like conversation.

You are NOT a therapist, doctor, or medical service. You do not diagnose, treat, or prescribe.

## CORE PERSONALITY:
You are: calm, warm, emotionally present, genuinely supportive, naturally conversational, grounded and real.
You feel like a caring friend who listens and understands—not a chatbot or assistant.
Your tone is consistent, warm, and human. You never sound scripted, robotic, or clinical.

## COMMUNICATION STYLE:
- Responses are naturally 3–6 sentences (sometimes shorter, sometimes slightly deeper)
- Use simple, everyday language that feels like a real person talking
- Acknowledge the user's emotion first, then gently guide
- Avoid lists, lectures, or over-explaining
- Avoid medical, clinical, or diagnostic language
- Never sound like a template or prewritten response

## EMOTIONAL PRESENCE:
You adapt to what the user is experiencing:
- For anxiety: calm, grounding, reassuring without being dismissive
- For exhaustion: gentle, validating, encouraging rest
- For sadness: warm, understanding, present with their feelings
- For overthinking: clear, simple, helping them step back
- For loneliness: genuinely connected, making them feel seen
- For overwhelm: slowing down, breaking things into smaller pieces

## RESPONSE FLOW:
Connection (acknowledge what they said) → Validation (show you understand) → Gentle direction (calm guidance)

Example: "That sounds really heavy right now. It makes sense you're feeling this way. Let's just breathe together for a moment."

## WHAT TO AVOID (STRICTLY):
- Do NOT repeat: "You are not alone," "Take a deep breath," "Everything will be okay," or similar phrases
- Do NOT sound like a motivational poster or self-help book
- Do NOT give medical, psychological, or diagnostic advice
- Do NOT overwhelm with information or long explanations
- Do NOT change tone or sound suddenly different
- Do NOT use clinical language ("anxiety disorder," "rumination," etc.)
- Do NOT sound robotic, formal, or like a FAQ

## NATURAL CONVERSATION:
- Each message should feel fresh and different from the last
- Vary your phrasing and approach based on the conversation
- Use contractions and natural speech ("you're," "I'm," "let's")
- Sometimes be brief, sometimes go a bit deeper—whatever feels right
- Respond to what they actually said, not a template

## FINAL GOAL:
Users should feel: "Someone calm is here with me," not "A chatbot is replying."
After each message, they should feel a little safer, a little more understood, and a little calmer.`;

/**
 * OpenAI API Client for Relaxess (Server-Proxied)
 * Calls the secure server endpoint instead of OpenAI directly
 */
export class OpenAIClient {
  private serverClient: AxiosInstance;
  
  // Rate limiting and throttling
  private lastRequestTime = 0;
  private minRequestInterval = 500; // Minimum 500ms between requests
  private isProcessingRequest = false;

  private getMaxTokens(context: ChatContext): number {
    const mode = context.mode || 'chat';
    const mood = context.mood?.toLowerCase() || '';

    // Sleep and grounding modes allow deeper responses
    if (mode === 'sleep') return 350;
    if (mode === 'grounding') return 400;
    if (mode === 'quiet') return 120;

    // Emotional states get more flexible token limits
    if (mood.includes('anxiety') || mood.includes('stress') || mood.includes('panic')) {
      return 220;
    }

    if (mood.includes('overthinking') || mood.includes('rumination')) {
      return 250;
    }

    if (mood.includes('sadness') || mood.includes('sad')) {
      return 240;
    }

    if (mood.includes('loneliness') || mood.includes('lonely')) {
      return 260;
    }

    if (mood.includes('exhaustion') || mood.includes('tired') || mood.includes('fatigue')) {
      return 200;
    }

    // Default: allow natural 3-6 sentence responses
    return 240;
  }

  constructor() {
    // Create axios client for server endpoint (no API key needed here)
    const baseUrl = getApiBaseUrl();
    this.serverClient = axios.create({
      baseURL: baseUrl || 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000, // 60 second timeout
    });
  }

  /**
   * Check if a request is currently being processed
   */
  isRequestInProgress(): boolean {
    return this.isProcessingRequest;
  }

  /**
   * Throttle requests to prevent overwhelming the server
   */
  private async throttleRequest(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minRequestInterval) {
      const delayNeeded = this.minRequestInterval - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delayNeeded));
    }

    this.lastRequestTime = Date.now();
  }

  /**
   * Get a neutral fallback response when server is unavailable
   */
  private getNeutralFallbackResponse(): string {
    const fallbacks = [
      "I'm here with you. Take a moment to breathe.",
      "Let's pause for a second. What you're feeling matters.",
      "I'm listening. You're not alone in this.",
      "It's okay to feel what you're feeling right now.",
      "Take your time. I'm here.",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  /**
   * Build message history for context
   */
  private buildMessageHistory(userMessage: string, context: ChatContext): Array<{ role: string; content: string }> {
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add recent message history (last 5 messages for context)
    const recentMessages = context.messageHistory.slice(-5);
    for (const msg of recentMessages) {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    return messages;
  }

  /**
   * Send message and get AI response with context
   * Calls the secure server endpoint instead of OpenAI directly
   */
  async chat(userMessage: string, context: ChatContext): Promise<AIResponse> {
    // Prevent multiple simultaneous requests
    if (this.isProcessingRequest) {
      return {
        message: this.getNeutralFallbackResponse(),
        tokensUsed: 0,
        success: false,
        error: 'Request already in progress. Please wait.',
      };
    }

    this.isProcessingRequest = true;

    try {
      // Throttle requests to prevent overwhelming the server
      await this.throttleRequest();

      // Build message history
      const messageHistory = this.buildMessageHistory(userMessage, context);

      // Get dynamic max tokens based on mode and emotional state
      const maxTokens = this.getMaxTokens(context);

      // Call server endpoint (which proxies to LLM service)
      try {
        const response = await this.serverClient.post('/api/chat', {
          messages: messageHistory,
          maxTokens: maxTokens,
        });

        const data = response.data;

        if (!data.content) {
          console.error('[OpenAI] ❌ No content in response');
          return {
            message: this.getNeutralFallbackResponse(),
            tokensUsed: 0,
            success: false,
            error: 'No response from server',
          };
        }

        return {
          message: data.content,
          tokensUsed: data.usage?.total_tokens || 0,
          success: true,
        };
      } catch (err: any) {
        console.error('[OpenAI] ❌ Server request failed');

        // Detailed error logging for debugging
        if (err.response?.status) {
          const statusCode = err.response.status;
          const apiErrorMessage = err.response.data?.error || '';
          console.error(`[OpenAI] HTTP ${statusCode}: ${apiErrorMessage}`);

          if (statusCode === 429) {
            return {
              message: 'The service is a bit busy right now. Please try again in a moment.',
              tokensUsed: 0,
              success: false,
              error: 'Rate limited',
            };
          }

          if (statusCode === 500) {
            return {
              message: this.getNeutralFallbackResponse(),
              tokensUsed: 0,
              success: false,
              error: 'Server error',
            };
          }
        }

        // Network or timeout error
        if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
          return {
            message: 'The connection timed out. Please try again.',
            tokensUsed: 0,
            success: false,
            error: 'Timeout',
          };
        }

        // Generic fallback
        return {
          message: this.getNeutralFallbackResponse(),
          tokensUsed: 0,
          success: false,
          error: err.message || 'Unknown error',
        };
      }
    } finally {
      this.isProcessingRequest = false;
    }
  }
}

let openaiClient: OpenAIClient | null = null;

export function initializeOpenAIClient(): OpenAIClient {
  openaiClient = new OpenAIClient();
  return openaiClient;
}

export function getOpenAIClient(): OpenAIClient {
  if (!openaiClient) {
    openaiClient = new OpenAIClient();
  }
  return openaiClient;
}
