"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export const autocomplete = async (input: string) => {
    if (!input) return [];

    try {
        const response = await client.placeAutocomplete({
            params: {
                input,
                key: process.env.GOOGLE_API_KEY!,
                components: ["country:JO"]
            }
        });

        return response.data.predictions.map((prediction) => ({
            description: prediction.description,
            place_id: prediction.place_id
        }));
    } catch (error) {
        console.error("Google Autocomplete Error:", error); 
        return [];
    }
}
