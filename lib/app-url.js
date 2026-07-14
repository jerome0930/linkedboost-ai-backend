function normalizeUrl(value) {
  const rawValue = value?.trim();

  if (!rawValue) {
    return null;
  }

  const urlWithScheme = /^https?:\/\//i.test(rawValue)
    ? rawValue
    : `https://${rawValue}`;

  try {
    const url = new URL(urlWithScheme);

    if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
      return null;
    }

    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function requestBaseUrl(request) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host");

  if (!host) {
    return null;
  }

  const protocol =
    request.headers.get("x-forwarded-proto") ||
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return `${protocol}://${host}`;
}

export function getAppUrl(request) {
  const candidates = [
    process.env.APP_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    requestBaseUrl(request),
  ];

  for (const candidate of candidates) {
    const url = normalizeUrl(candidate);

    if (url) {
      return url;
    }
  }

  const error = new Error("APP_URL must be a valid http(s) URL.");
  error.code = "APP_URL_INVALID";
  throw error;
}
