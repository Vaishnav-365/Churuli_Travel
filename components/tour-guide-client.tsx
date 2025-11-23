"use client";

import {
  TourGuideForm,
  TourPlanDisplay,
} from "@/components/tour-guide-components";
import { TourPlan } from "@/lib/actions/tour-guide";
import { useState } from "react";

interface TourGuideClientProps {
  onSubmitForm: (
    formData: FormData
  ) => Promise<{ success: boolean; data?: TourPlan; error?: string }>;
}

export default function TourGuideClient({
  onSubmitForm,
}: TourGuideClientProps) {
  const [tourPlan, setTourPlan] = useState<TourPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await onSubmitForm(formData);

      if (result.success && result.data) {
        setTourPlan(result.data);
      } else {
        setError(
          result.error || "Failed to generate tour plan. Please try again."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-cyan-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row w-full h-full gap-4">
          {/* Left pane - Tour plan display */}

          <div className="w-full lg:w-2/5">
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm text-red-700 p-4 mb-4 rounded-xl border border-red-200">
                {error}
              </div>
            )}
            <TourGuideForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          {/* Right pane - Input form */}
          <div className="w-full lg:w-3/5 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-100/50">
            {tourPlan ? (
              <TourPlanDisplay tourPlan={tourPlan} />
            ) : (
              <div className="flex h-full items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800">Your Travel Guide</h2>
                  <p className="text-gray-600">
                    Fill out the form to get a personalized travel plan for your
                    next adventure. We&apos;ll provide recommendations for places to
                    visit, cultural tips, cost estimates, and a day-by-day
                    itinerary.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
