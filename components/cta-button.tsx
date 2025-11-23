"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth-actions";
import Link from "next/link";

interface CtaButtonProps {
  isAuthenticated: boolean;
}

export default function CtaButton({ isAuthenticated }: CtaButtonProps) {
  const handleLogin = () => {
    login();
  };

  if (isAuthenticated) {
    return (
      <Button asChild size="lg" className="font-bold py-3 px-6">
        <Link href="/trips/new">Create Your First Trip</Link>
      </Button>
    );
  }

  return (
    <Button onClick={handleLogin} size="lg" className="font-bold py-3 px-6">
      Sign In with Google
    </Button>
  );
}
