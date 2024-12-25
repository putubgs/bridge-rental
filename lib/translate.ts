export async function translateToArabic(text: string) {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`,
    );
    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

// Helper to translate multiple texts at once
export async function translateMultipleToArabic(texts: string[]) {
  const translations = await Promise.all(
    texts.map((text) => translateToArabic(text)),
  );
  return Object.fromEntries(texts.map((text, i) => [text, translations[i]]));
}
