"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${apiKey}`
  );

  const data = await response.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("No results found for the provided address");
  }

  const { center, place_name } = data.features[0];
  const [lng, lat] = center;

  return { lat, lng, formattedAddress: place_name };
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const address = formData.get("address")?.toString();
  if (!address) {
    throw new Error("Missing address");
  }

  const { lat, lng, formattedAddress } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: formattedAddress,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}

