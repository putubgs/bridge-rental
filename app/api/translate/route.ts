import { Translate } from "@google-cloud/translate/build/src/v2";

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();
    const [translation] = await translate.translate(text, targetLang);

    return Response.json({ translation });
  } catch (error) {
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }
}
