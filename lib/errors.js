import { jsonResponse } from "./cors.js";

export function errorResponse(request, error) {
  console.error(error?.code || error?.name || "ERROR", error?.message || "Unknown error");
  return jsonResponse(request, {
    error: error?.message || "The server could not complete the request.",
    code: error?.code || "SERVER_ERROR",
  }, Number(error?.status || 500));
}
