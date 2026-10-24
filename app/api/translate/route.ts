export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();
    const key = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!key || typeof text !== "string" || typeof targetLang !== "string") {
      return Response.json({ error: "Translation failed" }, { status: 500 });
    }

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: "text",
        }),
      },
    );

    if (!response.ok) {
      return Response.json({ error: "Translation failed" }, { status: 500 });
    }

    const data = await response.json();
    const translation = data?.data?.translations?.[0]?.translatedText;

    if (typeof translation !== "string") {
      return Response.json({ error: "Translation failed" }, { status: 500 });
    }

    return Response.json({ translation });
  } catch {
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }
}
