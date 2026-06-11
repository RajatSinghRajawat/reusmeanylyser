const RETRYABLE_PATTERNS = [
  /503/i,
  /429/i,
  /service unavailable/i,
  /high demand/i,
  /overloaded/i,
  /rate limit/i,
  /resource exhausted/i,
  /temporarily unavailable/i,
  /try again later/i,
  /fetch failed/i,
  /ENOTFOUND/i,
  /ECONNREFUSED/i,
  /ETIMEDOUT/i,
  /UNABLE_TO_VERIFY/i,
  /certificate/i,
];

export function isRetryableGeminiError(error) {
  const message = error?.message || String(error);
  return RETRYABLE_PATTERNS.some((pattern) => pattern.test(message));
}

function isModelNotFoundError(raw) {
  return (
    /404/i.test(raw) ||
    /is not found for API version/i.test(raw) ||
    /models\/[\w.-]+ is not/i.test(raw)
  );
}

export function toClientGeminiError(error) {
  const raw = error?.message || String(error);

  if (/429|quota exceeded|Too Many Requests/i.test(raw)) {
    return {
      status: 429,
      message:
        "Gemini free quota reached. Wait 1 minute and try again, or use a new API key from https://aistudio.google.com/apikey",
      retryable: true,
      code: "AI_QUOTA",
    };
  }

  if (/fetch failed|UNABLE_TO_VERIFY|certificate/i.test(raw)) {
    return {
      status: 503,
      message:
        "Cannot reach Google AI (SSL issue). Restart backend — TLS fix loads from index.js automatically.",
      retryable: true,
      code: "AI_NETWORK",
    };
  }

  if (isRetryableGeminiError(error)) {
    return {
      status: 503,
      message: "AI servers are busy. Please wait a moment and try again.",
      retryable: true,
      code: "AI_OVERLOADED",
    };
  }

  if (/api key|API_KEY|401|403|permission|invalid.*key/i.test(raw)) {
    return {
      status: 500,
      message:
        "Invalid Gemini API key. Create one at https://aistudio.google.com/apikey and set GEMINI_API_KEY in Backend/.env (no spaces).",
      retryable: false,
      code: "AI_CONFIG",
    };
  }

  if (isModelNotFoundError(raw)) {
    return {
      status: 500,
      message: "AI model not found. Set GEMINI_MODEL=gemini-2.5-flash in Backend/.env",
      retryable: false,
      code: "AI_MODEL",
    };
  }

  if (/AI_PARSE|AI_INVALID|JSON parse/i.test(raw)) {
    return {
      status: 502,
      message: "AI returned an invalid response. Please try again.",
      retryable: true,
      code: "AI_PARSE_ERROR",
    };
  }

  return {
    status: 500,
    message: "Could not analyze your resume. Please try again.",
    retryable: true,
    code: "AI_ERROR",
  };
}
