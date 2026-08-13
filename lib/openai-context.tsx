/**
 * OpenAI Context Provider (Server-Proxied)
 * Manages chat state, message history, and API interactions
 * All API calls go through the secure server endpoint
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from './app-context';
import {
  OpenAIClient,
  ChatMessage,
  AIResponse,
  initializeOpenAIClient,
  type ChatContext,
} from './openai-service';

export interface OpenAIContextType {
  // Chat state
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;

  // Session management
  messageCount: number;
  dailyMessageLimit: number;
  messagesRemainingToday: number;
  currentMood: string | null;

  // Actions
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  setCurrentMood: (mood: string | null) => void;
  setDailyMessageLimit: (limit: number) => void;
  startNewSession: (mood: string) => void;
  resetDailyMessageCount: () => Promise<void>;
}

const OpenAIContext = createContext<OpenAIContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MESSAGES_TODAY: '@relaxess_messages_today',
  LAST_MESSAGE_DATE: '@relaxess_last_message_date',
  DAILY_LIMIT: '@relaxess_daily_limit',
};

export function OpenAIProvider({ children }: { children: React.ReactNode }) {
  const { session: appSession } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [dailyMessageLimit, setDailyMessageLimitState] = useState(10);
  const [messagesRemainingToday, setMessagesRemainingToday] = useState(10);
  const [currentMood, setCurrentMoodState] = useState<string | null>(null);
  const [openaiClient, setOpenaiClient] = useState<OpenAIClient | null>(null);

  // Initialize OpenAI client (no API key needed - server proxies)
  useEffect(() => {
    const initializeProvider = async () => {
      try {
        // Initialize client (no API key required - server proxies to LLM)
        const client = initializeOpenAIClient();
        setOpenaiClient(client);

        // Load daily message count
        const today = new Date().toDateString();
        const lastMessageDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_MESSAGE_DATE);
        const savedDailyLimit = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_LIMIT);

        if (savedDailyLimit) {
          const limit = parseInt(savedDailyLimit, 10);
          setDailyMessageLimitState(limit);
        }

        if (lastMessageDate === today) {
          // Same day - load saved count
          const savedCount = await AsyncStorage.getItem(STORAGE_KEYS.MESSAGES_TODAY);
          const count = savedCount ? parseInt(savedCount, 10) : 0;
          setMessageCount(count);
          setMessagesRemainingToday(Math.max(0, dailyMessageLimit - count));
        } else {
          // New day - reset count
          await AsyncStorage.setItem(STORAGE_KEYS.LAST_MESSAGE_DATE, today);
          await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES_TODAY, '0');
          setMessageCount(0);
          setMessagesRemainingToday(dailyMessageLimit);
        }
      } catch (err) {
        console.error('Failed to initialize OpenAI provider:', err);
        setError('Failed to initialize chat service');
      }
    };

    initializeProvider();
  }, []);

  // Update messages remaining when limit changes
  useEffect(() => {
    setMessagesRemainingToday(Math.max(0, dailyMessageLimit - messageCount));
  }, [dailyMessageLimit, messageCount]);

  // Update daily message limit based on premium status
  useEffect(() => {
    if (appSession.isPremium) {
      // Premium users have unlimited messages
      setDailyMessageLimitState(999);
    } else {
      // Free users have 10 messages per day
      setDailyMessageLimitState(10);
    }
  }, [appSession.isPremium]);

  /**
   * Send message and get AI response
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!openaiClient) {
        setError('Chat service not initialized');
        return;
      }

      // Validate message (basic checks)
      if (!content || !content.trim()) {
        setError('Message cannot be empty');
        return;
      }

      if (content.length > 1000) {
        setError('Message is too long (max 1000 characters)');
        return;
      }

      // Check message limit (only for free users)
      if (!appSession.isPremium && messageCount >= dailyMessageLimit) {
        setError('Daily message limit reached. Try again tomorrow.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Create message ID
        const userMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Add user message to chat
        const userMessage: ChatMessage = {
          id: userMessageId,
          role: 'user',
          content: content.trim(),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMessage]);

        // Build chat context for the server
        const chatContext: ChatContext = {
          mood: currentMood,
          messageHistory: messages,
          sessionStartTime: Date.now(),
        };

        // Get AI response from server
        const response: AIResponse = await openaiClient.chat(content.trim(), chatContext);

        // Handle response
        if (!response.success) {
          // API failed - show error in UI only, NOT in chat
          setError('AI is temporarily unavailable. Please try again.');
          // Do NOT add any message to chat history
        } else {
          // API succeeded - add ONLY real model response to chat
          const assistantMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            role: 'assistant',
            content: response.message,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMessage]);

          // Clear any previous errors on success
          setError(null);

          // Increment message count (only on success)
          const newCount = messageCount + 1;
          setMessageCount(newCount);

          // Save to storage (only on success)
          const today = new Date().toDateString();
          await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES_TODAY, newCount.toString());
          await AsyncStorage.setItem(STORAGE_KEYS.LAST_MESSAGE_DATE, today);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Failed to send message:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [openaiClient, messages, messageCount, dailyMessageLimit, appSession.isPremium, currentMood]
  );

  /**
   * Clear chat history
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  /**
   * Set current mood for context
   */
  const setCurrentMood = useCallback((mood: string | null) => {
    setCurrentMoodState(mood);
  }, []);

  /**
   * Set daily message limit
   */
  const setDailyMessageLimit = useCallback((limit: number) => {
  setDailyMessageLimitState(limit);
  AsyncStorage.setItem(STORAGE_KEYS.DAILY_LIMIT, limit.toString());
}, []);

const resetDailyMessageCount = useCallback(async () => {
  const today = new Date().toDateString();

  setMessageCount(0);
  setMessagesRemainingToday(dailyMessageLimit);
  setError(null);

  await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES_TODAY, '0');
  await AsyncStorage.setItem(STORAGE_KEYS.LAST_MESSAGE_DATE, today);
}, [dailyMessageLimit]);
  

  /**
   * Start a new session with a specific mood
   */
  const startNewSession = useCallback((mood: string) => {
    setCurrentMoodState(mood);
    clearChat();
  }, [clearChat]);

  const value: OpenAIContextType = {
    messages,
    isLoading,
    error,
    messageCount,
    dailyMessageLimit,
    messagesRemainingToday,
    currentMood,
    sendMessage,
    clearChat,
    setCurrentMood,
    setDailyMessageLimit,
    resetDailyMessageCount,
    startNewSession,
  };

  return (
    <OpenAIContext.Provider value={value}>
      {children}
    </OpenAIContext.Provider>
  );
}

export function useOpenAI(): OpenAIContextType {
  const context = useContext(OpenAIContext);
  if (!context) {
    throw new Error('useOpenAI must be used within OpenAIProvider');
  }
  return context;
}
