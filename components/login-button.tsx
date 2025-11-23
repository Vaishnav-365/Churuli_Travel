"use client";

import { login } from "@/lib/auth-actions";
import { useEffect } from "react";

export default function LoginButton() {
  useEffect(() => {
    const handleLogin = () => {
      login();
    };

    // Listen for login event
    document.addEventListener("login", handleLogin);

    // Cleanup event listener
    return () => {
      document.removeEventListener("login", handleLogin);
    };
  }, []);

  return null;
}
