const DEFAULT_EXTENSION_ORIGIN = "chrome-extension://kobkbgiclonfgcpkbmjiodmjioggjhfm";

function allowedOrigins() {
  return new Set(
    (process.env.ALLOWED_ORIGINS || DEFAULT_EXTENSION_ORIGIN)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (origin.startsWith("chrome-extension://")) return true;

  const origins = allowedOrigins();
  if (origins.has(origin)) return true;

  for (const allowedOrigin of origins) {
    if (allowedOrigin.endsWith("*") && origin.startsWith(allowedOrigin.slice(0, -1))) {
      return true;
    }
  }

  return false;
}

export function corsHeaders(request) {
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    "Cache-Control": "no-store",
  };

  if (origin && isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

export function jsonResponse(request, body, status = 200) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

export function optionsResponse(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export function assertAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    const error = new Error("This client origin is not allowed.");
    error.status = 403;
    error.code = "ORIGIN_NOT_ALLOWED";
    throw error;
  }
}
