"use client";

import { addLocation } from "@/lib/actions/add-location";
import { useTransition } from "react";
import { Button } from "./ui/button";

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransation] = useTransition();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-blue-50/30 via-cyan-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-xl p-8 shadow-xl rounded-2xl border border-blue-100/50">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800">
            Add New Location
          </h1>

          <form
            className="space-y-6"
            action={(formData: FormData) => {
              startTransation(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Address
              </label>
              <input
                name="address"
                type="text"
                required
                className="w-full border border-blue-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full">
              {isPending ? "Adding..." : "Add Location"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
