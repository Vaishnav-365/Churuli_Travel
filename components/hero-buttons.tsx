"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth-actions";
import Link from "next/link";

interface HeroButtonsProps {
  isAuthenticated: boolean;
}

export default function HeroButtons({ isAuthenticated }: HeroButtonsProps) {
  const handleLogin = () => {
    login();
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
        >
          <Link href="/trips">View My Trips</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="bg-transparent border-white text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
        >
          <Link href="/trips/new">Create New Trip</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        onClick={handleLogin}
        size="lg"
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
      >
        Sign In to Get Started
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="bg-transparent border-white text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
      >
        <Link href="#how-it-works">Learn More</Link>
      </Button>
    </div>
  );
}
