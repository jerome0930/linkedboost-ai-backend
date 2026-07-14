const DEFAULT_EXTENSION_ORIGIN = "chrome-extension://kobkbgiclonfgcpkbmjiodmjioggjhfm";

function allowedOrigins() {
  return new Set(
    (process.env.ALLOWED_ORIGINS || DEFAULT_EXTENSION_ORIGIN)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
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

  if (origin && allowedOrigins().has(origin)) {
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
  if (!origin || !allowedOrigins().has(origin)) {
    const error = new Error("This client origin is not allowed.");
    error.status = 403;
    error.code = "ORIGIN_NOT_ALLOWED";
    throw error;
  }
}
