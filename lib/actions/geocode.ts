interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${apiKey}`
    );

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return {
        country: "Unknown",
        formattedAddress: "Unknown location",
      };
    }

    const result = data.features[0];
    const context = result.context || [];

    // Try to find the country name
    const countryFeature =
      result.place_type?.includes("country") ||
      context.find((f: any) => f.id?.startsWith("country"));

    return {
      country: countryFeature?.text || "Unknown",
      formattedAddress: result.place_name || "Unknown location",
    };
  } catch (error) {
    console.error("MapTiler Geocoding error:", error);
    return {
      country: "Unknown",
      formattedAddress: "Unknown location",
    };
  }
}

