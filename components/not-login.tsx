"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth-actions";
import Image from "next/image";

const NotLogin = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Background Image from Unsplash - Airplane window view */}
      <Image
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Airplane Window View"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Card */}
      <div className="relative z-10 max-w-md w-full p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl mx-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to Churuli
          </h2>
          <p className="text-gray-600">
            Sign in to explore amazing trips around the globe
          </p>

          <div className="py-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-100/70 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-gray-500"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
          </div>

          <Button
            onClick={() => login()}
            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-6"
          >
            <span>Sign in with Google</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            Unlock personalized trip planning, itineraries, and AI-powered
            travel suggestions
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotLogin;
