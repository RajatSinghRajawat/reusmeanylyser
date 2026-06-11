import {
  GEMINI_MODELS,
  GEMINI_KEYS,
  getModel,
} from "../config/gemini.js";

import { isRetryableGeminiError } from "../utils/geminiErrors.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RETRY_DELAYS_MS = [1200, 2500, 4000];
const MAX_ATTEMPTS_PER_MODEL = 3;

export async function generateResumeAnalysis(
  prompt,
  mimeType = "application/json"
) {
  const errors = [];

  for (const apiKey of GEMINI_KEYS) {
    for (const modelName of GEMINI_MODELS) {
      for (
        let attempt = 0;
        attempt < MAX_ATTEMPTS_PER_MODEL;
        attempt++
      ) {
        try {
          const model = getModel(
            apiKey,
            modelName,
            mimeType
          );

          const result =
            await model.generateContent(prompt);

          const text = result.response.text();

          if (!text?.trim()) {
            throw new Error("Empty response from AI");
          }

          console.log(
            `SUCCESS => key=${apiKey.slice(
              0,
              8
            )}... model=${modelName}`
          );

          return text;
        } catch (error) {
          errors.push({
            key: apiKey.slice(0, 8),
            modelName,
            attempt: attempt + 1,
            message: error.message,
          });

          console.warn(
            `FAILED => key=${apiKey.slice(
              0,
              8
            )} model=${modelName} attempt=${
              attempt + 1
            }`
          );

          const retryable =
            isRetryableGeminiError(error);

          if (
            retryable &&
            attempt < MAX_ATTEMPTS_PER_MODEL - 1
          ) {
            await sleep(RETRY_DELAYS_MS[attempt]);
            continue;
          }

          break;
        }
      }
    }
  }

  const err = new Error(
    "All Gemini API Keys and Models Failed"
  );

  err.attempts = errors;

  throw err;
}