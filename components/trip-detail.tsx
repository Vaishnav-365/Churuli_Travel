"use client";

import { Location, Trip } from "@/app/generated/prisma";
import Map from "@/components/map";
import { Calendar, MapPin, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SortableItinerary from "./sortable-itinerary";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-cyan-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {trip.imageUrl && (
          <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              fill
              priority
            />
          </div>
        )}
        
        <div className="bg-white/80 backdrop-blur-xl p-6 shadow-xl rounded-2xl border border-blue-100/50 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800">
              {trip.title}
            </h1>

            <div className="flex items-center text-blue-600 mt-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-lg">
                {trip.startDate.toLocaleDateString()} -
                {trip.endDate.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href={`/trips/${trip.id}/itinerary/new`}>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full">
                <Plus className="mr-2 h-5 w-5" /> Add Location
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl p-6 shadow-xl rounded-2xl border border-blue-100/50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-blue-50/50 p-1 rounded-xl">
              <TabsTrigger value="overview" className="text-lg data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg data-[state=active]:text-blue-700 transition-all duration-300">
                Overview
              </TabsTrigger>
              <TabsTrigger value="itinerary" className="text-lg data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg data-[state=active]:text-blue-700 transition-all duration-300">
                Itinerary
              </TabsTrigger>
              <TabsTrigger value="map" className="text-lg data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg data-[state=active]:text-blue-700 transition-all duration-300">
                Map
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800"> Trip Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-blue-50/50 rounded-xl">
                      <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-700"> Dates</p>
                        <p className="text-sm text-gray-500">
                          {trip.startDate.toLocaleDateString()} -
                          {trip.endDate.toLocaleDateString()}
                          <br />
                          {`${Math.round(
                            (trip.endDate.getTime() - trip.startDate.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )} days(s)`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-cyan-50/50 rounded-xl">
                      <MapPin className="h-6 w-6 mr-3 text-cyan-600" />
                      <div>
                        <p className="font-medium text-gray-700"> Destinations</p>
                        <p>
                          {trip.locations.length}
                          {trip.locations.length === 1 ? "location" : "locations"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-72 rounded-xl overflow-hidden shadow-lg border border-blue-100">
                  <Map itineraries={trip.locations} />
                </div>
                {trip.locations.length === 0 && (
                  <div className="text-center p-4 bg-blue-50/30 rounded-xl">
                    <p className="text-blue-700 mb-4">Add locations to see them on the map.</p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full">
                        <Plus className="mr-2 h-5 w-5" /> Add Location
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="p-4 bg-blue-50/30 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                    {trip.description}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800"> Full Itinerary</h2>
              </div>

              {trip.locations.length === 0 ? (
                <div className="text-center p-4 bg-blue-50/30 rounded-xl">
                  <p className="text-blue-700 mb-4">Add locations to see them on the itinerary.</p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full">
                      <Plus className="mr-2 h-5 w-5" /> Add Location
                    </Button>
                  </Link>
                </div>
              ) : (
                <SortableItinerary locations={trip.locations} tripId={trip.id} />
              )}
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <div className="h-72 rounded-xl overflow-hidden shadow-lg border border-blue-100">
                <Map itineraries={trip.locations} />
              </div>
              {trip.locations.length === 0 && (
                <div className="text-center p-4 bg-blue-50/30 rounded-xl">
                  <p className="text-blue-700 mb-4">Add locations to see them on the map.</p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full">
                      <Plus className="mr-2 h-5 w-5" /> Add Location
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <div className="text-center">
          <Link href={`/trips`}>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full">
              Back to Trips
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
