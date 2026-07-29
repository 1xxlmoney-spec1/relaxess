import { Router, Request, Response } from "express";
import multer from "multer";
import { invokeLLM, type Message, type InvokeParams } from "./llm";
import { transcribeAudio } from "./voiceTranscription";
import { storagePut } from "../storage";
import { z } from "zod";

const chatRouter = Router();

// Request validation schema
const ChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant", "tool", "function"]),
      content: z.union([
        z.string(),
        z.object({ type: z.literal("text"), text: z.string() }),
      ]),
    })
  ),
  maxTokens: z.number().int().min(1).max(4096).optional(),
});

type ChatRequest = z.infer<typeof ChatRequestSchema>;

/**
 * POST /api/chat
 * Secure server-side proxy for Relaxess AI chat.
 *
 * Accepts conversation messages from the mobile client and returns AI responses.
 * All OpenAI API credentials are kept server-side.
 */
chatRouter.post("/chat", async (req: any, res: Response) => {
  try {
    // Validate request body
    const validationResult = ChatRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: "Invalid request",
        details: validationResult.error.issues.map((e: any) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }

    const { messages, maxTokens } = validationResult.data;

    // Enforce reasonable request size limit
    if (messages.length > 100) {
      return res.status(400).json({
        error: "Too many messages (max 100)",
      });
    }

    // Normalize messages for LLM service
    const normalizedMessages: Message[] = messages.map(msg => ({
      role: msg.role,
      content: typeof msg.content === "string" ? msg.content : msg.content.text,
    }));

    // Build LLM invoke parameters
    const llmParams: InvokeParams = {
      messages: normalizedMessages,
      maxTokens: maxTokens || 1024,
    };

    // Call server-side LLM service (keeps API key secret)
    const result = await invokeLLM(llmParams);

    // Extract the assistant's response
    const assistantMessage = result.choices[0]?.message?.content;
    if (!assistantMessage) {
      return res.status(500).json({
        error: "No response from AI service",
      });
    }

    // Return only the necessary response data
    return res.json({
      role: "assistant",
      content: assistantMessage,
      usage: result.usage,
    });
  } catch (error) {
    console.error("[chat-router] Error:", error);

    // Return safe error response (no internal details)
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Check for specific error types
    if (errorMessage.includes("API key")) {
      return res.status(500).json({
        error: "Server configuration error",
      });
    }

    if (errorMessage.includes("rate limit")) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Failed to process chat request",
    });
  }
});

// Configure multer for audio file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 16 * 1024 * 1024, // 16MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Only accept audio files
    const allowedMimes = [
      "audio/mpeg",
      "audio/wav",
      "audio/mp4",
      "audio/m4a",
      "audio/ogg",
      "audio/webm",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid audio format: ${file.mimetype}`));
    }
  },
});

/**
 * POST /api/transcribe
 * Secure server-side proxy for audio transcription.
 * Accepts audio file from mobile client and returns transcribed text.
 * All OpenAI Whisper API credentials are kept server-side.
 */
chatRouter.post("/transcribe", upload.single("file"), async (req: any, res: Response) => {
  try {
    // Validate file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: "No audio file provided",
      });
    }

    console.log("[chat-router] Received audio file:", {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    // Upload audio to storage to get a URL
    const storageResult = await storagePut(
      `audio-${Date.now()}.${getFileExtensionFromMime(req.file.mimetype)}`,
      req.file.buffer,
      req.file.mimetype
    );

    const audioUrl = storageResult.url;
    console.log("[chat-router] Audio uploaded to storage:", audioUrl);

    // Transcribe audio using server-side service
    const result = await transcribeAudio({
      audioUrl: audioUrl,
      language: "en",
    });

    // Check for error response
    if ("error" in result) {
      return res.status(400).json({
        error: result.error,
        code: result.code,
      });
    }

    // Return transcribed text
    return res.json({
      text: result.text,
    });
  } catch (error) {
    console.error("[chat-router] Transcription error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("API key")) {
      return res.status(500).json({
        error: "Server configuration error",
      });
    }

    if (errorMessage.includes("rate limit")) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Failed to transcribe audio",
    });
  }
});

/**
 * Helper function to get file extension from MIME type
 */
function getFileExtensionFromMime(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/mp4": "mp4",
    "audio/m4a": "m4a",
    "audio/ogg": "ogg",
    "audio/webm": "webm",
  };
  return mimeToExt[mimeType] || "audio";
}

export { chatRouter };
