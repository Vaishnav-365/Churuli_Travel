"use client";

import { motion } from "framer-motion";

export function Filters({ onFilter }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-lg rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 border border-blue-100/50"
    >
      {/* ⭐ Search by Language (TEXT INPUT) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <label className="block text-sm font-semibold mb-2 text-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Search by Language
        </label>
        <input
          type="text"
          placeholder="Type a language (eg: Hindi)"
          className="w-full border-2 border-blue-200/60 rounded-xl px-4 py-2.5 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:scale-[1.02] hover:border-blue-300 bg-white/80 backdrop-blur-sm shadow-sm"
          onChange={(e) => onFilter("language", e.target.value)}
        />
      </motion.div>

      {/* ⭐ Rating Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <label className="block text-sm font-semibold mb-2 text-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Minimum Rating
        </label>
        <select
          className="w-full border-2 border-blue-200/60 rounded-xl px-4 py-2.5 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:scale-[1.02] hover:border-blue-300 bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer"
          onChange={(e) => onFilter("rating", e.target.value)}
        >
          <option value="">Any</option>
          <option value="1">1 ★ & up</option>
          <option value="2">2 ★ & up</option>
          <option value="3">3 ★ & up</option>
          <option value="4">4 ★ & up</option>
        </select>
      </motion.div>

      {/* ⭐ Experience Filter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <label className="block text-sm font-semibold mb-2 text-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Experience
        </label>
        <select
          className="w-full border-2 border-blue-200/60 rounded-xl px-4 py-2.5 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:scale-[1.02] hover:border-blue-300 bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer"
          onChange={(e) => onFilter("experience", e.target.value)}
        >
          <option value="">Any</option>
          <option value="1">1+ years</option>
          <option value="3">3+ years</option>
          <option value="5">5+ years</option>
        </select>
      </motion.div>
    </motion.div>
  );
}

