"use client";

import NotLogin from "@/components/not-login";
import TourGuideClient from "@/components/tour-guide-client";
import { generateTourPlan } from "@/lib/actions/tour-guide";
import { useSession } from "next-auth/react";

export default function GuidePage() {
  const { data: session, status } = useSession();

  // If loading session, show minimal loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authenticated, show the NotLogin component
  if (!session) {
    return <NotLogin />;
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-[calc(100vh-80px)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Travel Guide</h1>
        <p className="text-gray-600">
          Get personalized travel recommendations and itineraries for your next
          adventure
        </p>
      </div>

      <TourGuideClient onSubmitForm={generateTourPlan} />
    </div>
  );
}
