"use client";

import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

interface Location {
  lat: number;
  lng: number;
  locationTitle: string;
}

interface MapProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map>();

  useEffect(() => {
    if (!mapContainer.current) return;

    // Set your API key
    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;

    // Determine map center
    const center =
      itineraries.length > 0
        ? [itineraries[0].lng, itineraries[0].lat]
        : [0, 0];

    // Create map
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center,
      zoom: 8,
    });

    // Add markers for each itinerary
    itineraries.forEach((location) => {
      new maptilersdk.Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new maptilersdk.Popup().setHTML(
            `<strong>${location.locationTitle}</strong>`
          )
        )
        .addTo(map.current!);
    });

    return () => map.current?.remove();
  }, [itineraries]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-lg shadow-md"
    />
  );
}

