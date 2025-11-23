"use server";

import { z } from "zod";

// Define interfaces for API response parsing
interface PlaceResponse {
  name?: string;
  description?: string;
}

interface DayItineraryResponse {
  day?: number;
  activities?: string;
}

interface EstimatedCostsResponse {
  accommodation?: string | Record<string, string>;
  food?: string | Record<string, string>;
  transportation?: string | Record<string, string>;
  activities?: string | Record<string, string>;
  total?: string | Record<string, string>;
}

interface TourPlanResponse {
  destination?: string;
  summary?: string;
  bestTimeToVisit?: string;
  placesToVisit?: PlaceResponse[];
  culturalNotes?: string;
  transportationTips?: string;
  accommodationSuggestions?: string;
  foodRecommendations?: string;
  estimatedCosts?: EstimatedCostsResponse;
  itinerarySuggestion?: DayItineraryResponse[];
}

function forceString(val: any): string {
  if (!val) return "Not available";
  if (typeof val === "string") return val;
  if (typeof val === "object") return JSON.stringify(val);
  return "";
}

// Define the schema for destination input
const destinationSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  duration: z.string().min(1, {
    message: "Please specify a duration.",
  }),
  interests: z.string().optional(),
  budget: z.string().optional(),
  travelStyle: z.string().optional(),
});

// Define TypeScript type for the tour plan
export type CostValue = string | Record<string, string>;

export type TourPlan = {
  destination: string;
  summary: string;
  bestTimeToVisit: string;
  placesToVisit: {
    name: string;
    description: string;
  }[];
  culturalNotes: string;
  transportationTips: string;
  accommodationSuggestions: string;
  foodRecommendations: string;
  estimatedCosts: {
    accommodation: CostValue;
    food: CostValue;
    transportation: CostValue;
    activities: CostValue;
    total: CostValue;
  };
  itinerarySuggestion: {
    day: number;
    activities: string;
  }[];
};

export async function generateTourPlan(
  formData: FormData
): Promise<{ success: boolean; data?: TourPlan; error?: string }> {
  try {
    // Extract and validate form data
    const destination = formData.get("destination") as string;
    const duration = formData.get("duration") as string;
    const interests = formData.get("interests") as string;
    const budget = formData.get("budget") as string;
    const travelStyle = formData.get("travelStyle") as string;
    const originalDestination = destination.trim();

    // Validate input
    const result = destinationSchema.safeParse({
      destination,
      duration,
      interests,
      budget,
      travelStyle,
    });

    if (!result.success) {
      return {
        success: false,
        error: "Invalid input. Please check your destination and duration.",
      };
    }

    // GROQ API endpoint
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "API key not configured. Please contact the administrator.",
      };
    }

    // Create a comprehensive prompt
    const prompt = `
      Create a detailed tour plan for ${destination} for a ${duration} trip.
      ${interests ? `The traveler is interested in: ${interests}.` : ""}
      ${budget ? `Their budget is: ${budget}.` : ""}
      ${travelStyle ? `Their preferred travel style is: ${travelStyle}.` : ""}
      
      Please provide a detailed response in JSON format with the following structure:
      {
        "destination": "Full destination name",
        "summary": "Brief overview of the destination",
        "bestTimeToVisit": "Information about the best seasons or months to visit",
        "placesToVisit": [
          {"name": "Place 1", "description": "Brief description"},
          {"name": "Place 2", "description": "Brief description"}
        ],
        "culturalNotes": "Important cultural information visitors should know",
        "transportationTips": "How to get around efficiently",
        "accommodationSuggestions": "Types of accommodations available at different price points",
        "foodRecommendations": "Must-try local dishes and dining options",
        "estimatedCosts": {
          "accommodation": "Average costs per night",
          "food": "Average daily food costs",
          "transportation": "Local transportation costs",
          "activities": "Average costs for attractions",
          "total": "Estimated total cost for the trip"
        },
        "itinerarySuggestion": [
          {"day": 1, "activities": "Detailed day 1 itinerary"},
          {"day": 2, "activities": "Detailed day 2 itinerary"}
        ]
      }
      
      Make sure to adapt the itinerary days to match the requested duration of ${duration}.
      Provide realistic cost estimates based on the destination and budget level.
    `;

    // Make API call to GROQ
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are a travel expert who provides detailed tour plans in JSON format.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: `API Error: ${errorData.error?.message || response.statusText}`,
      };
    }


    const responseData = await response.json();
    const parsedContent = JSON.parse(
      responseData.choices[0].message.content
    ) as TourPlanResponse;
    
    
    function normalizeCost(cost: any): string {
	  if (!cost) return "Not specified";

	  if (typeof cost === "string") return cost.trim();

	  if (typeof cost === "object") {
	    return Object.entries(cost)
	      .map(([key, value]) => `${key}: ${value}`)
	      .join(" | ");
	  }

	  return String(cost);
	}
	function joinList(items: (string | number)[]): string {
  return items.map(String).map(i => `• ${i}`).join("\n");
}

function formatFood(food: any): string {
  if (!food) return "No food recommendations available";

  // If it's already a simple string
  if (typeof food === "string") return food.trim();

  // If it's an array
  if (Array.isArray(food)) {
    // array of strings or objects
    const lines: string[] = [];
    for (const item of food) {
      if (typeof item === "string") lines.push(`• ${item}`);
      else if (typeof item === "object" && item !== null) {
        // object: try to prettify (name + desc) or join values
        const name = item.name || item.title || item.restaurant || Object.keys(item)[0];
        const desc =
          item.description ||
          item.desc ||
          item.details ||
          (Object.values(item).slice(1).join(" ").trim() || "");
        lines.push(desc ? `• ${name}: ${desc}` : `• ${JSON.stringify(item)}`);
      } else {
        lines.push(`• ${String(item)}`);
      }
    }
    return lines.join("\n");
  }

  // If it's an object (most flexible handling)
  if (typeof food === "object") {
    const parts: string[] = [];

    // Common structure: { dishes: {...}, diningOptions: {...} }
    if (food.dishes) {
      if (typeof food.dishes === "string") {
        parts.push("🍽️ Popular Dishes:\n" + food.dishes.trim());
      } else if (Array.isArray(food.dishes)) {
        parts.push("🍽️ Popular Dishes:\n" + joinList(food.dishes));
      } else if (typeof food.dishes === "object") {
        const lines = Object.entries(food.dishes).map(
          ([dish, desc]) => `• ${dish}: ${String(desc)}`
        );
        parts.push("🍽️ Popular Dishes:\n" + lines.join("\n"));
      }
    }

    if (food.diningOptions) {
      if (typeof food.diningOptions === "string") {
        parts.push("🍴 Recommended Restaurants:\n" + food.diningOptions.trim());
      } else if (Array.isArray(food.diningOptions)) {
        parts.push("🍴 Recommended Restaurants:\n" + joinList(food.diningOptions));
      } else if (typeof food.diningOptions === "object") {
        const lines = Object.entries(food.diningOptions).map(
          ([name, desc]) => `• ${name}: ${String(desc)}`
        );
        parts.push("🍴 Recommended Restaurants:\n" + lines.join("\n"));
      }
    }

    // Generic fallback: take other keys and render them intelligently
    const genericKeys = Object.keys(food).filter(k => !["dishes", "diningOptions"].includes(k));
    for (const key of genericKeys) {
      const val = (food as any)[key];
      if (typeof val === "string") {
        parts.push(`${key.replace(/_/g, " ")}:\n${val.trim()}`);
      } else if (Array.isArray(val)) {
        parts.push(`${key.replace(/_/g, " ")}:\n${joinList(val)}`);
      } else if (typeof val === "object" && val !== null) {
        const lines = Object.entries(val).map(
          ([k, v]) => `• ${k}: ${String(v)}`
        );
        parts.push(`${key.replace(/_/g, " ")}:\n${lines.join("\n")}`);
      } else {
        parts.push(`${key}: ${String(val)}`);
      }
    }

    // If we collected nothing (strange object), stringify reasonably
    if (parts.length === 0) {
      // try flatten small object into bullet list
      const lines = Object.entries(food).map(
        ([k, v]) =>
          Array.isArray(v)
            ? `• ${k}: ${v.join(", ")}`
            : `• ${k}: ${String(v)}`
      );
      return lines.join("\n");
    }

    return parts.join("\n\n");
  }

  // final fallback
  return String(food);
}

function formatAccommodation(accom: any): string {
  if (!accom) return "No accommodation suggestions available";

  if (typeof accom === "string") return accom.trim();

  if (Array.isArray(accom)) {
    // array could be strings or objects
    return accom
      .map((item) =>
        typeof item === "string"
          ? `• ${item}`
          : typeof item === "object" && item !== null
          ? `• ${item.name || JSON.stringify(item)}: ${item.description || ""}`
          : `• ${String(item)}`
      )
      .join("\n");
  }

  if (typeof accom === "object") {
    // If object keyed by tier -> values are descriptions
    const lines = Object.entries(accom).map(([tier, desc]) => {
      if (Array.isArray(desc)) return `• ${tier}: ${desc.join(", ")}`;
      if (typeof desc === "object" && desc !== null) {
        // nested object: try to flatten name/desc pairs
        const nested = Object.entries(desc)
          .map(([k, v]) => `${k}: ${v}`)
          .join("; ");
        return `• ${tier}: ${nested}`;
      }
      return `• ${tier}: ${String(desc)}`;
    });
    return lines.join("\n");
  }

  return String(accom);
}

    const estimated = parsedContent.estimatedCosts ?? {};
    // Validate and normalize the response
    const tourPlanData: TourPlan = {
      destination: parsedContent.destination || originalDestination,
      originalDestination,
      summary: forceString(parsedContent.summary) || "No summary available",
      bestTimeToVisit: forceString(parsedContent.bestTimeToVisit) || "Information not available",
      placesToVisit: Array.isArray(parsedContent.placesToVisit)
	  ? parsedContent.placesToVisit.map((place: PlaceResponse) => ({
	      name: forceString(place.name),
	      description: forceString(place.description),
	    }))
	  : [],
      culturalNotes: forceString(parsedContent.culturalNotes) || "No cultural notes available",
      transportationTips: forceString(parsedContent.transportationTips) || "No transportation tips available",
      accommodationSuggestions: formatAccommodation(parsedContent.accommodationSuggestions),
      foodRecommendations: formatFood(parsedContent.foodRecommendations),
      estimatedCosts: {
    accommodation: normalizeCost(estimated.accommodation),
    food: normalizeCost(estimated.food),
    transportation: normalizeCost(estimated.transportation),
    activities: normalizeCost(estimated.activities),
    total: normalizeCost(estimated.total),
  },
      itinerarySuggestion: Array.isArray(parsedContent.itinerarySuggestion)
  ? parsedContent.itinerarySuggestion.map((day: DayItineraryResponse) => ({
      day: day.day || 0,
      activities: day.activities,
    }))
  : [],
    };

    return {
      success: true,
      data: tourPlanData,
    };
  } catch (error) {
    console.error("Error generating tour plan:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}


