/**
 * Audio Transcription Service
 * Handles uploading audio files and transcribing them using OpenAI Whisper
 */

import * as FileSystem from "expo-file-system/legacy";
import { trpc } from "./trpc";

export interface TranscriptionResult {
  text: string;
  language: string;
  duration: number;
  segments: Array<{
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
  }>;
}

export interface TranscriptionError {
  error: string;
  code: string;
  details?: string;
}

/**
 * Upload audio file from local URI to storage
 * Returns the public URL for the uploaded file
 * Note: This is a server-side operation, call from within a React component using useMutation
 */
export async function uploadAudioFileViaServer(
  localUri: string,
  fileName: string = "recording.m4a"
): Promise<string> {
  try {

    // Read file from local storage
    const fileContent = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (!fileContent) {
      throw new Error("Failed to read audio file");
    }


    // Note: This function should be called from a component with useMutation
    // For now, we return the file content and let the component handle the upload
    return fileContent;
  } catch (error) {
    console.error("[AudioTranscription] ❌ File read failed:", error);
    throw new Error(
      `Failed to read audio: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Get tRPC hooks for audio operations
 * These should be called from within React components
 */
export function useAudioTranscriptionMutations() {
  const uploadMutation = trpc.storage.uploadAudio.useMutation();
  const transcribeMutation = trpc.voice.transcribe.useMutation();

  return {
    uploadMutation,
    transcribeMutation,
  };
}

/**
 * Upload and transcribe audio using tRPC mutations
 * Call this from a React component that has access to the mutations
 */
export async function uploadAndTranscribeWithMutations(
  uploadMutation: any,
  transcribeMutation: any,
  localUri: string,
  fileName?: string,
  language?: string,
  prompt?: string
): Promise<TranscriptionResult | TranscriptionError> {
  try {

    // Step 1: Read audio file
    const fileContent = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (!fileContent) {
      throw new Error("Failed to read audio file");
    }

    // Step 2: Upload audio file
    const uploadResponse = await uploadMutation.mutateAsync({
      fileName: fileName || "recording.m4a",
      fileData: fileContent,
      contentType: "audio/m4a",
    });

    if (!uploadResponse.url) {
      throw new Error("Upload failed: no URL returned");
    }


    // Step 3: Transcribe audio
    const transcriptionResult = await transcribeMutation.mutateAsync({
      audioUrl: uploadResponse.url,
      language,
      prompt,
    });

    return {
      text: transcriptionResult.text,
      language: transcriptionResult.language,
      duration: transcriptionResult.duration,
      segments: transcriptionResult.segments,
    };
  } catch (error) {
    console.error("[AudioTranscription] ❌ Upload and transcription failed:", error);

    return {
      error: "Upload and transcription failed",
      code: "UPLOAD_TRANSCRIPTION_FAILED",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}


