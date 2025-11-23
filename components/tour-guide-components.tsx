"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TourPlan } from "@/lib/actions/tour-guide";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";


interface TourGuideFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full">
      {pending ? "Generating tour plan..." : "Generate Tour Plan"}
    </Button>
  );
}

export function TourGuideForm({ onSubmit, isLoading }: TourGuideFormProps) {
  return (
    <Card className="w-full bg-white/80 backdrop-blur-xl border border-blue-100/50 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800">Plan Your Perfect Trip</CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          Tell us where you want to go and we&apos;ll create a customized tour
          plan for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-blue-700 font-medium">Where do you want to go?</Label>
            <Input
              id="destination"
              name="destination"
              placeholder="e.g. Kyoto, Japan"
              required
              disabled={isLoading}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-blue-700 font-medium">How long will you stay?</Label>
            <Select name="duration" disabled={isLoading}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-200">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                <SelectItem value="week">One week</SelectItem>
                <SelectItem value="two_weeks">Two weeks</SelectItem>
                <SelectItem value="month">One month</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests" className="text-blue-700 font-medium">What are your interests?</Label>
            <Textarea
              id="interests"
              name="interests"
              placeholder="e.g. hiking, historical sites, local cuisine, photography"
              disabled={isLoading}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-blue-700 font-medium">What&apos;s your budget level?</Label>
            <Select name="budget" disabled={isLoading}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-200">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (Backpacking)</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelStyle" className="text-blue-700 font-medium">What&apos;s your travel style?</Label>
            <Select name="travelStyle" disabled={isLoading}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-200">
                <SelectValue placeholder="Select travel style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relaxed">Relaxed & Leisurely</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="adventurous">
                  Adventurous & Fast-paced
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

interface TourPlanDisplayProps {
  tourPlan: TourPlan;
}

export function TourPlanDisplay({ tourPlan }: TourPlanDisplayProps) {
  return (
    <div className="space-y-6 p-4 overflow-y-auto max-h-[calc(100vh-2rem)] bg-gradient-to-b from-blue-50/30 to-white">
      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800">{tourPlan.destination}</h1>
        <p className="text-gray-600">{tourPlan.summary}</p>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Best Time to Visit</h2>
        <p>{tourPlan.bestTimeToVisit}</p>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Places to Visit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {tourPlan.placesToVisit?.map((place, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-md border border-blue-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-800">{place.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{place.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Cultural Notes</h2>
        <Card className="bg-white/70 backdrop-blur-md border border-blue-100/50">
          <CardContent className="pt-4">
            <p>{tourPlan.culturalNotes}</p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Transportation Tips</h2>
        <Card className="bg-white/70 backdrop-blur-md border border-blue-100/50">
          <CardContent className="pt-4">
            <p>{tourPlan.transportationTips}</p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">
          Accommodation Suggestions
        </h2>
        <Card className="bg-white/70 backdrop-blur-md border border-blue-100/50">
          <CardContent className="pt-4">
            <p>{tourPlan.accommodationSuggestions}</p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Food Recommendations</h2>
        <Card className="bg-white/70 backdrop-blur-md border border-blue-100/50">
          <CardContent className="pt-4">
            <p>{tourPlan.foodRecommendations}</p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Estimated Costs</h2>
        <Card className="bg-white/70 backdrop-blur-md border border-blue-100/50">
          <CardContent className="pt-4">
            <div className="space-y-2">
              {/* Safe rendering of estimated costs */}
              <div className="flex justify-between items-start">
                <span className="text-blue-700">Accommodation:</span>
                <div className="font-medium">
                  <CostRenderer cost={tourPlan.estimatedCosts.accommodation} />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-blue-700">Food:</span>
                <div className="font-medium">
                  <CostRenderer cost={tourPlan.estimatedCosts.food} />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-blue-700">Transportation:</span>
                <div className="font-medium">
                  <CostRenderer cost={tourPlan.estimatedCosts.transportation} />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-blue-700">Activities:</span>
                <div className="font-medium">
                  <CostRenderer cost={tourPlan.estimatedCosts.activities} />
                </div>
              </div>
              <div className="flex justify-between items-start border-t border-blue-200 pt-2 mt-2">
                <span className="font-bold text-blue-800">Total:</span>
                <div className="font-bold text-blue-800">
                  <CostRenderer cost={tourPlan.estimatedCosts.total} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/50">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">Suggested Itinerary</h2>
      <div className="space-y-4">
        {tourPlan.itinerarySuggestion?.map((day) => (
          <Card key={day.day} className="bg-white/70 backdrop-blur-md border border-blue-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-800">{day.day}</CardTitle>
        </CardHeader>

        <CardContent>
          {Array.isArray(day.activities) ? (
            <ul className="list-disc ml-5 space-y-1">
              {day.activities.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          ) : (
            <p>{day.activities || day.plan || "No activities available"}</p>
          )}
        </CardContent>
          </Card>
        ))}
      </div>
    </div>
      {/* Booking Section */}
    <div className="pt-6 border-t border-blue-200 p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">Ready to Book?</h2>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Hotels */}
        <a
          href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
        tourPlan.originalDestination
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-center hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-medium"
        >
          Book Hotels
        </a>

        {/* Flights */}
        <a
          href={`https://www.google.com/travel/flights?q=${encodeURIComponent(
        tourPlan.originalDestination
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-center hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-medium"
        >
          Book Flights
        </a>

        {/* Trains */}
        <a
          href={`https://www.irctc.co.in/nget/train-search`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-center hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-medium"
        >
          Book Trains
        </a>
      </div>
    </div>
    </div>
  );
}

// Safe cost renderer component to handle complex cost structures
function CostRenderer({ cost }: { cost: unknown }) {
  if (cost === null || cost === undefined) return <span>Not available</span>;

  if (typeof cost === "string" || typeof cost === "number")
    return <span>{String(cost)}</span>;

  if (typeof cost === "object") {
    try {
      return (
        <div className="flex flex-col gap-1 text-right">
          {Object.entries(cost as Record<string, any>).map(
            ([key, value], index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-blue-700">
                  {key.replace(/_/g, " ").replace(/-/g, " ")}:
                </span>{" "}
                {String(value)}
              </div>
            )
          )}
        </div>
      );
    } catch {
      return <span>{JSON.stringify(cost)}</span>;
    }
  }

  return <span>{String(cost)}</span>;
}
