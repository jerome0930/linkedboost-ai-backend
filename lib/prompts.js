const FEATURE_INSTRUCTIONS = {
  "ai-rewrite": "Rewrite the post to improve clarity, flow, specificity, and engagement while preserving all facts.",
  "viral-hook": "Create 5 strong LinkedIn opening hooks based only on the source. Put each hook on its own numbered line.",
  storytelling: "Rewrite the source as a concise professional story with a clear setup, turning point, lesson, and takeaway.",
  "executive-tone": "Rewrite the post in a concise, credible executive voice. Avoid hype and corporate clichés.",
  "recruiter-tone": "Rewrite the post to communicate skills, outcomes, and professional value clearly to recruiters and hiring managers.",
  hashtags: "Return 5 to 8 focused LinkedIn hashtags relevant to the source. Return only the hashtags on one line.",
  "cta-generator": "Return 5 natural calls to action for the end of this LinkedIn post. Avoid engagement bait.",
  expand: "Expand the notes into a complete LinkedIn post under 2,500 characters without inventing details.",
  condense: "Condense the post substantially while preserving its central point, important facts, and natural voice.",
};

export function buildPrompt(featureId, text) {
  const task = FEATURE_INSTRUCTIONS[featureId];
  if (!task) {
    const error = new Error("Unknown AI feature.");
    error.status = 400;
    error.code = "INVALID_FEATURE";
    throw error;
  }

  return {
    instructions: [
      "You are LinkedBoost AI, a professional LinkedIn writing assistant.",
      "Return only the requested final content. Do not add explanations, disclaimers, or quotation marks.",
      "Never invent employers, roles, achievements, numbers, dates, names, credentials, or outcomes.",
      "Preserve the user's intended meaning and use readable spacing.",
    ].join(" "),
    input: `${task}\n\nSOURCE:\n${text}`,
  };
}
