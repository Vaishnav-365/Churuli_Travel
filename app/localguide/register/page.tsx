"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterGuide() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    languages: "",
    bio: "",
  });

  async function sendOTP() {
    const res = await fetch("/api/guide/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("OTP sent!");
      setOtpSent(true);
    } else alert("Failed to send OTP");
  }

  async function verifyOTP() {
    const res = await fetch("/api/guide/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
      alert("Email verified 🎉");
      setVerified(true);
    } else alert("Invalid or expired OTP");
  }

  async function finalSubmit() {
    const res = await fetch("/api/guide/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        name: form.name,
        phone: form.phone,
        experience: form.experience,
        languages: form.languages.split(","),
        bio: form.bio,
      }),
    });

    if (res.ok) alert("Registered successfully!");
    else alert("Error registering user");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-lg p-4 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">
            {verified ? "Complete Registration" : "Email Verification"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!verified ? (
            <>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {!otpSent ? (
                <Button className="w-full" onClick={sendOTP}>
                  Send OTP
                </Button>
              ) : (
                <>
                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={verifyOTP}>
                      Verify
                    </Button>
                    <Button className="flex-1" onClick={sendOTP}>
                      Resend OTP
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Input
                placeholder="Full Name"
                value={form.name ?? ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Phone Number"
                value={form.phone ?? ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Experience (years)"
                value={form.experience ?? ""}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              />
              <Input
                placeholder="Languages (comma separated)"
                value={form.languages ?? ""}
                onChange={(e) => setForm({ ...form, languages: e.target.value })}
              />
              <Input
                placeholder="Short Bio"
                value={form.bio ?? ""}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />

              <Button className="w-full" onClick={finalSubmit}>
                Register Guide
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

