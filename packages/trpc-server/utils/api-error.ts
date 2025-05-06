// utils/apiError.ts
import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";

type TRPCErrorCode = keyof typeof TRPC_ERROR_CODES_BY_KEY;

interface ApiErrorOptions {
  code?: TRPCErrorCode;
  cause?: unknown;
  meta?: Record<string, unknown>;
}

/**
 * Creates and throws a TRPCError with customizable options
 * @param message - Error message
 * @param options - Optional error configuration
 * @throws {TRPCError}
 * @example
 * // Throw a simple bad request error
 * ApiError("Invalid input");
 *
 * // Throw a not found error with metadata
 * ApiError("User not found", { code: "NOT_FOUND", meta: { userId: 123 } });
 *
 * // Throw an error with a cause
 * ApiError("Processing failed", { cause: originalError });
 */
export function ApiError(
  message: string,
  options: ApiErrorOptions = {}
): never {
  const { code = "BAD_REQUEST", cause, meta } = options;

  throw new TRPCError({
    code,
    message,
    cause, // Available in TRPC v10+
    ...(meta && { meta }), // Only include meta if provided
  });
}
