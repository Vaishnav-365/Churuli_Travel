"use client";

import { useEffect, useState } from "react";
import GuideCard from "@/components/GuideCard";
import { useSession } from "next-auth/react";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import GuideSearch from "@/components/GuideSearch";
import { Filters } from "@/components/Filters";
import { MapPin, Shield, Star, Sparkles } from "lucide-react";

export default function BookGuidePage() {
  const { data: session } = useSession();

  const [location, setLocation] = useState<any>(null);
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔎 FILTER STATES
  const [filters, setFilters] = useState({
    search: "",
    language: "",
    rating: "",
    experience: "",
  });

  // ------------------------------------------------
  // LOAD GUIDES FROM BACKEND
  // ------------------------------------------------
  async function loadGuides(selectedLocation: string) {
    if (!selectedLocation) return;

    setLoading(true);

    const res = await fetch(
      `/api/guide/list?location=${encodeURIComponent(selectedLocation)}`
    );

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setGuides(data.guides);
      setFilteredGuides(data.guides);
      setActiveBookings(data.activeBookings);
    }
  }

  // When location changes → fetch guides
  useEffect(() => {
    if (location?.name) {
      console.log("Fetching guides for:", location.name);
      loadGuides(location.name);
    }
  }, [location]);

  // ------------------------------------------------
  // APPLY FILTERS
  // ------------------------------------------------
  const applyFilters = () => {
    let list = [...guides];

    // Text search
    if (filters.search) {
      list = list.filter((g) =>
        g.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // ⭐ Language search (text input)
    if (filters.language) {
      const lang = filters.language.toLowerCase().trim();
      list = list.filter((g) =>
        g.languages?.some((l: string) => l.toLowerCase().includes(lang))
      );
    }

    // Rating
    if (filters.rating) {
      list = list.filter((g) => g.ratingValue >= Number(filters.rating));
    }

    // Experience
    if (filters.experience) {
      list = list.filter((g) => g.experience >= Number(filters.experience));
    }

    setFilteredGuides(list);
  };

  // Recalculate when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, guides]);

  // Update specific filter
  const updateFilter = (type: string, value: any) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-12">
      {/* HERO SECTION - Enhanced with animations */}
      <section className="text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-transparent bg-clip-text animate-in fade-in slide-in-from-top-2 duration-700 delay-100">
            Find Your Perfect Local Guide
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto animate-in fade-in slide-in-from-top-3 duration-700 delay-200">
            Explore with trusted and verified guides. Get help with sightseeing,
            food spots, hidden gems, language support, and more.
          </p>
        </div>

        {/* Feature Cards with staggered animations */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              icon: Shield,
              title: "Verified Guides",
              description: "Professionally verified & trusted.",
              delay: "delay-300",
              gradient: "from-blue-50 to-blue-100/50",
            },
            {
              icon: Sparkles,
              title: "Local Expertise",
              description: "Discover hidden gems & local secrets.",
              delay: "delay-400",
              gradient: "from-cyan-50 to-cyan-100/50",
            },
            {
              icon: Star,
              title: "Safe & Reliable",
              description: "Trusted by travelers worldwide.",
              delay: "delay-500",
              gradient: "from-blue-50 to-cyan-100/50",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`group p-6 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-sm border border-blue-100 
                hover:shadow-xl hover:scale-105 hover:-translate-y-1 
                transition-all duration-500 ease-out cursor-pointer
                animate-in fade-in slide-in-from-bottom-4 ${feature.delay}
                backdrop-blur-sm`}
            >
              <div className="flex items-start gap-4 text-left">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl 
                  group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-blue-700 mb-1 
                    group-hover:text-blue-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION AUTOCOMPLETE - Enhanced */}
      <section className="mt-8 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Search a Location</h2>
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.01]">
          <LocationAutocomplete onSelect={(loc) => setLocation(loc)} />
        </div>
      </section>

      {/* SEARCH + FILTERS - Animated entrance */}
      {location && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <GuideSearch guides={guides} onFilter={updateFilter} />
          <Filters onFilter={updateFilter} />
        </section>
      )}

      {/* GUIDE RESULTS - Animated */}
      {location && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></span>
            Available Guides in {location.name}
          </h2>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-cyan-600 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="text-gray-600 animate-pulse font-medium">Finding the best guides for you...</p>
            </div>
          )}

          {!loading && filteredGuides.length === 0 && (
            <div className="text-center py-12 px-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 text-lg">No guides match your filters.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGuides.map((g, index) => (
              <div
                key={g.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GuideCard
                  guide={g}
                  refresh={() => loadGuides(location)}
                  user={session?.user}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USER ACTIVE BOOKINGS - Enhanced */}
      {activeBookings.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></span>
            Your Booked Guides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeBookings.map((b, index) => (
              <div
                key={b.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GuideCard
                  guide={b.guide}
                  bookingId={b.id}
                  booked={true}
                  refresh={() => loadGuides(location)}
                  user={session?.user}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

