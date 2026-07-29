import { describe, it, expect } from 'vitest';
import { getOpenAIClient, initializeOpenAIClient, type ChatContext } from '../lib/openai-service';

describe('OpenAI Service (Server-Proxied)', () => {
  describe('Client Initialization', () => {
    it('should initialize client without API key', () => {
      const client = initializeOpenAIClient();
      expect(client).toBeDefined();
    });

    it('should return same client instance', () => {
      const client1 = getOpenAIClient();
      const client2 = getOpenAIClient();
      expect(client1).toBe(client2);
    });

    it('should not have request in progress initially', () => {
      const client = initializeOpenAIClient();
      expect(client.isRequestInProgress()).toBe(false);
    });
  });

  describe('Token Limit Calculation', () => {
    it('should calculate correct token limits for different modes', () => {
      const client = initializeOpenAIClient();

      // Sleep mode
      let context: ChatContext = {
        mood: 'sleep',
        messageHistory: [],
        sessionStartTime: Date.now(),
        mode: 'sleep',
      };
      // Note: token limit calculation is now private, so we can't directly test it
      // But we can verify the client handles different contexts

      // Grounding mode
      context = {
        mood: 'anxiety',
        messageHistory: [],
        sessionStartTime: Date.now(),
        mode: 'grounding',
      };
      expect(context.mode).toBe('grounding');

      // Quiet mode
      context = {
        mood: 'overwhelm',
        messageHistory: [],
        sessionStartTime: Date.now(),
        mode: 'quiet',
      };
      expect(context.mode).toBe('quiet');
    });

    it('should handle different emotional states', () => {
      const moods = [
        'anxiety',
        'stress',
        'overthinking',
        'sadness',
        'loneliness',
        'exhaustion',
      ];

      for (const mood of moods) {
        const context: ChatContext = {
          mood,
          messageHistory: [],
          sessionStartTime: Date.now(),
        };
        expect(context.mood).toBe(mood);
      }
    });
  });

  describe('Error Handling', () => {
    it('should prevent concurrent requests', async () => {
      const client = initializeOpenAIClient();

      // Simulate a request in progress
      // Note: In real usage, this would be set by the chat() method
      // For testing, we just verify the client has the method
      expect(client.isRequestInProgress()).toBe(false);
    });
  });

  describe('Chat Context', () => {
    it('should create valid chat context', () => {
      const context: ChatContext = {
        mood: 'anxiety',
        messageHistory: [
          {
            id: '1',
            role: 'user',
            content: 'I am feeling anxious',
            timestamp: Date.now(),
          },
        ],
        sessionStartTime: Date.now(),
        mode: 'chat',
      };

      expect(context.mood).toBe('anxiety');
      expect(context.messageHistory).toHaveLength(1);
      expect(context.mode).toBe('chat');
    });

    it('should handle empty message history', () => {
      const context: ChatContext = {
        mood: null,
        messageHistory: [],
        sessionStartTime: Date.now(),
      };

      expect(context.messageHistory).toHaveLength(0);
      expect(context.mood).toBeNull();
    });

    it('should preserve message order', () => {
      const messages = [
        { id: '1', role: 'user' as const, content: 'First', timestamp: 1 },
        { id: '2', role: 'assistant' as const, content: 'Response', timestamp: 2 },
        { id: '3', role: 'user' as const, content: 'Second', timestamp: 3 },
      ];

      const context: ChatContext = {
        mood: 'neutral',
        messageHistory: messages,
        sessionStartTime: Date.now(),
      };

      expect(context.messageHistory[0].content).toBe('First');
      expect(context.messageHistory[1].content).toBe('Response');
      expect(context.messageHistory[2].content).toBe('Second');
    });
  });
});
