"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { createPortal } from "react-dom";

export default function LocationAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Track input position
  const [inputTop, setInputTop] = useState(0);
  const [inputLeft, setInputLeft] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const [inputHeight, setInputHeight] = useState(0);

  const updatePosition = (el: HTMLInputElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setInputTop(rect.top + window.scrollY);
    setInputLeft(rect.left + window.scrollX);
    setInputWidth(rect.width);
    setInputHeight(rect.height);
  };

  // Recalculate on scroll/resize
  useEffect(() => {
    const handle = () => {
      const input = document.getElementById("location-search-input");
      if (input) updatePosition(input as HTMLInputElement);
    };
    window.addEventListener("scroll", handle);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  const fetchSuggestions = async (value: string) => {
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://api.maptiler.com/geocoding/${value}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`
    );

    const data = await res.json();
    setSuggestions(data.features || []);
  };

  const Dropdown = (
    <AnimatePresence>
      {isFocused && suggestions.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: inputTop + inputHeight + 4,
            left: inputLeft,
            width: inputWidth,
            zIndex: 99999,
          }}
          className="bg-white border-2 border-blue-100 rounded-xl shadow-xl max-h-80 overflow-y-auto backdrop-blur-sm"
        >
          {suggestions.map((place, index) => (
            <motion.li
              key={place.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)", x: 4 }}
              className="px-4 py-3 cursor-pointer transition-all duration-200 border-b border-blue-50 last:border-b-0"
              onMouseDown={() => {
                // prevents blur before click
                setQuery(place.place_name);
                setSuggestions([]);

                const [lng, lat] = place.geometry.coordinates;
                const cleanName = place.place_name.split(",")[0].trim();

                onSelect({
                  name: cleanName,
                  rawName: place.place_name,
                  lat,
                  lng,
                });

                setIsFocused(false);
              }}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-gray-700 font-medium truncate">
                    {place.place_name.split(",")[0]}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {place.place_name}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 10px 40px rgba(59, 130, 246, 0.2)"
              : "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />

          <input
            id="location-search-input"
            type="text"
            ref={updatePosition}
            className="w-full border-2 border-blue-200/60 rounded-xl pl-12 pr-4 py-3.5 
                       transition-all duration-300 focus:border-blue-500 focus:ring-4 
                       focus:ring-blue-100 focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
            placeholder="Search location..."
            value={query}
            onChange={(e) => fetchSuggestions(e.target.value)}
            onFocus={(e) => {
              setIsFocused(true);
              updatePosition(e.target);
            }}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          />
        </motion.div>
      </motion.div>

      {/* Render dropdown OUTSIDE the layout in document.body */}
      {typeof window !== "undefined" &&
        createPortal(Dropdown, document.body)}
    </div>
  );
}

