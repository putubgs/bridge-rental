"use server";

type PlaceSuggestion = {
  description: string;
  place_id: string;
};

type AutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      placeId?: string;
      text?: { text?: string };
    };
  }>;
  error?: { message?: string };
};

export const autocomplete = async (
  input: string,
): Promise<PlaceSuggestion[]> => {
  if (!input) return [];

  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    console.error("Google Autocomplete Error: GOOGLE_API_KEY is not set");
    return [];
  }

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
        },
        body: JSON.stringify({
          input,
          includedRegionCodes: ["jo"],
        }),
      },
    );

    const data = (await response.json()) as AutocompleteResponse;

    if (!response.ok) {
      console.error(
        "Google Autocomplete Error:",
        data.error?.message ?? response.status,
      );
      return [];
    }

    return (data.suggestions ?? []).flatMap((suggestion) => {
      const prediction = suggestion.placePrediction;
      const description = prediction?.text?.text;
      const placeId = prediction?.placeId;

      if (!description || !placeId) return [];

      return [{ description, place_id: placeId }];
    });
  } catch (error) {
    console.error(
      "Google Autocomplete Error:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
};
