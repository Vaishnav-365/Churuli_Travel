// components/GuideSearch.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export default function GuideSearch({ guides = [], onFilter }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value) => {
    setQuery(value);

    const matches = guides.filter((g) =>
      g.name?.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(value ? matches.slice(0, 5) : []);
    onFilter("search", value);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto z-[100]">
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            className="w-full border-2 border-blue-200/60 rounded-xl pl-12 pr-4 py-3.5 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
            placeholder="Search guides by name..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-white border-2 border-blue-100 w-full rounded-xl mt-2 shadow-xl overflow-visible z-[9999] backdrop-blur-sm"
          >
            {suggestions.map((guide, index) => (
              <motion.li
                key={guide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)", x: 4 }}
                className="px-4 py-3 cursor-pointer transition-all duration-200 border-b border-blue-50 last:border-b-0"
                onClick={() => {
                  setQuery(guide.name);
                  setSuggestions([]);
                  onFilter("search", guide.name);
                }}
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700 font-medium">{guide.name}</span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
