export async function createTextResponse({ instructions, input }) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY;
  const model = process.env.OPENAI_MODEL;
  if (!apiKey || !model) {
    const error = new Error("OpenAI is not configured on the server.");
    error.status = 500;
    error.code = "AI_NOT_CONFIGURED";
    throw error;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions,
      input,
      max_output_tokens: 900,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error?.message || "The AI request failed.");
    error.status = response.status >= 500 ? 502 : 400;
    error.code = "AI_REQUEST_FAILED";
    throw error;
  }

  const text = data.output_text || data.output
    ?.flatMap((item) => item.content || [])
    ?.find((item) => item.type === "output_text")
    ?.text;

  if (!text?.trim()) {
    const error = new Error("The AI returned an empty response. Try again.");
    error.status = 502;
    error.code = "EMPTY_AI_RESPONSE";
    throw error;
  }
  return text.trim();
}
