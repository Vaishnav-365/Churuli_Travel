// components/GuideCard.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuideCard({ guide, refresh, user, booked, bookingId }) {
  const [openBooking, setOpenBooking] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  // ----------------------------
  // Validate dates client-side
  // ----------------------------
  function validateDates() {
    if (!start || !end) {
      alert("Please select both start and end dates.");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const s = new Date(start);
    const e = new Date(end);

    if (s < today) {
      alert("Start date cannot be before today.");
      return false;
    }

    if (e <= s) {
      alert("End date must be after start date.");
      return false;
    }

    return true;
  }

  // ----------------------------
  // Book guide
  // ----------------------------
  async function confirmBooking() {
    if (bookingLoading) return;
    if (!validateDates()) return;

    setBookingLoading(true);

    try {
      const res = await fetch("/api/guide/book", {
        method: "POST",
        body: JSON.stringify({
          guideId: guide.id,
          startDate: start,
          endDate: end,
          // backend determines user via auth; userName is optional nice-to-have
          userName: user?.name,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setBookingLoading(false);

      if (data.success) {
        // Keep existing UX
        alert("🎉 Guide booked successfully!");
        setOpenBooking(false);
        refresh();
      } else {
        alert("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setBookingLoading(false);
      console.error("Booking error:", err);
      alert("❌ Error booking guide. Try again.");
    }
  }

  // ----------------------------
  // Submit review & cancel booking
  // ----------------------------
  async function submitReview() {
    if (reviewLoading) return;
    if (!rating || !review) {
      alert("Rating & review cannot be empty.");
      return;
    }

    setReviewLoading(true);

    try {
      const res = await fetch("/api/guide/cancel", {
        method: "POST",
        body: JSON.stringify({
          bookingId,
          rating,
          review,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setReviewLoading(false);

      if (data.success) {
        alert("✅ Review submitted and booking cancelled!");
        setOpenReview(false);
        refresh();
      } else {
        alert("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setReviewLoading(false);
      console.error("Cancel/Review error:", err);
      alert("❌ Error submitting review. Try again.");
    }
  }

  // ----------------------------
  // Star display
  // ----------------------------
  function StarRatingDisplay({ value }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (value >= i) {
        stars.push(<span key={i} className="text-yellow-500 text-xl">★</span>);
      } else if (value >= i - 0.5) {
        stars.push(
          <span
            key={i}
            className="text-yellow-500 text-xl"
            style={{
              display: "inline-block",
              width: "1em",
              maskImage: "linear-gradient(90deg, black 50%, transparent 50%)",
              WebkitMaskImage: "linear-gradient(90deg, black 50%, transparent 50%)",
            }}
          >
            ★
          </span>
        );
      } else {
        stars.push(<span key={i} className="text-gray-300 text-xl">★</span>);
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  }

  // ----------------------------
  // Star input for review modal
  // ----------------------------
  function StarRatingInput() {
    return (
      <div className="flex space-x-2 mb-4 cursor-pointer">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`text-3xl ${ (hover || rating) >= i ? "text-yellow-500" : "text-gray-300" }`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(i)}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  }

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
        className="p-6 rounded-2xl shadow-lg border bg-gradient-to-br from-white via-blue-50/20 to-white backdrop-blur-xl transition-all duration-300 border-blue-100/50 group"
      >
        <div className="flex items-center justify-between mb-3">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
          >
            {guide.name}
          </motion.h2>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`px-3 py-1 text-sm rounded-full font-semibold shadow-sm ${
              guide.status === "available" ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700" : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
            }`}>
            {guide.status.toUpperCase()}
          </motion.span>
        </div>

        {/* Only show allowed fields */}
        {guide.bio && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-600 mt-2">{guide.bio}</motion.p>}

        {guide.experience && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-blue-700 font-medium mt-1">Experience: {guide.experience} years</motion.p>
        )}

        {guide.languages && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-blue-700 font-medium mt-1">Languages: {guide.languages.join(", ")}</motion.p>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex items-center space-x-2 mt-3">
          <StarRatingDisplay value={guide.ratingValue || 0} />
          <span className="text-sm text-gray-600">{(guide.ratingValue ?? 0).toFixed(1)} ({guide.ratingCount ?? 0})</span>
        </motion.div>

        {/* Buttons */}
        {guide.status === "available" && !booked && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpenBooking(true)}
            className="w-full mt-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            Book Guide
          </motion.button>
        )}

        {/* When this card is shown in "booked by user" list */}
        {booked && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpenReview(true)}
            className="w-full mt-5 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            Cancel & Review
          </motion.button>
        )}

        {guide.status === "booked" && !booked && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full mt-5 text-center text-red-500 font-semibold"
          >
            Already Booked
          </motion.p>
        )}
      </motion.div>

      {/* Booking modal */}
      <AnimatePresence>
        {openBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => !bookingLoading && setOpenBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-gradient-to-br from-white via-blue-50/30 to-white backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[90%] max-w-md border border-blue-100/50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Book Guide</h2>

              <label className="block mb-2 font-semibold text-gray-700">Start Date</label>
              <input
                type="date"
                className="w-full border-2 border-blue-200 p-3 rounded-xl mb-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />

              <label className="block mb-2 font-semibold text-gray-700">End Date</label>
              <input
                type="date"
                className="w-full border-2 border-blue-200 p-3 rounded-xl mb-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />

              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmBooking}
                  disabled={bookingLoading}
                  className={`flex-1 p-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg ${
                    bookingLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-xl"
                  }`}
                >
                  {bookingLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Booking...
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenBooking(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 p-3 rounded-xl transition-all duration-300 font-semibold"
                  disabled={bookingLoading}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review modal */}
      <AnimatePresence>
        {openReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => !reviewLoading && setOpenReview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-gradient-to-br from-white via-blue-50/30 to-white backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[90%] max-w-md border border-blue-100/50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Rate Your Guide</h2>

              <StarRatingInput />

              <textarea
                rows={4}
                className="w-full border-2 border-blue-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 mb-4"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />

              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitReview}
                  disabled={reviewLoading}
                  className={`flex-1 text-white p-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                    reviewLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-teal-600 hover:shadow-xl"
                  }`}
                >
                  {reviewLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenReview(false)}
                  disabled={reviewLoading}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 p-3 rounded-xl transition-all duration-300 font-semibold"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

