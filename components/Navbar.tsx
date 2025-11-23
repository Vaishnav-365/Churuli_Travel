"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { login, logout } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full flex items-center justify-center border-b border-blue-200/20 bg-gradient-to-r from-blue-950/90 via-cyan-900/90 to-sky-800/90 backdrop-blur-xl supports-[backdrop-filter]:bg-blue-950/80">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Avatar className="size-10 ring-2 ring-cyan-400/50">
              <AvatarImage src="/logo.png" alt="Churuli" />
              <AvatarFallback>WV</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold tracking-tight text-white">
              Churuli
            </span>
          </Link>
        </div>

        {session ? (
          <>
            <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
              <Link
                href="/trips"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  pathname === "/trips" || pathname.startsWith("/trips/")
                    ? "text-cyan-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-300 after:to-blue-300"
                    : "text-white/70 hover:text-white"
                )}
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  pathname === "/globe"
                    ? "text-cyan-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-300 after:to-blue-300"
                    : "text-white/70 hover:text-white"
                )}
              >
                Globe
              </Link>
              <Link
                href="/guide"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  pathname === "/guide"
                    ? "text-cyan-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-300 after:to-blue-300"
                    : "text-white/70 hover:text-white"
                )}
              >
                Generate Itinerary
              </Link>
              <Link
                href="/localguide/register"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  pathname === "/guide/register"
                    ? "text-cyan-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-300 after:to-blue-300"
                    : "text-white/70 hover:text-white"
                )}
              >
                Register as Guide
              </Link>
              <Link
                href="/book-guide"
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  pathname === "/book-guide"
                    ? "text-cyan-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-300 after:to-blue-300"
                    : "text-white/70 hover:text-white"
                )}
              >
                Book a Guide
              </Link>
            </nav>

            <Button
              variant="outline"
              onClick={() => logout()}
              className="rounded-full border-cyan-400/50 bg-white/10 text-white hover:bg-white/20 hover:border-cyan-300 hover:text-white cursor-pointer backdrop-blur-sm"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            onClick={() => login()}
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Sign In
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
            >
              <path
                fill="#ffffff"
                d="M533.5 278.4c0-17.4-1.4-34-4.1-50.2H272v95h146.9c-6.3 34.3-25 63.4-53.4 83v68h86.4c50.6-46.6 81.6-115.4 81.6-195.8z"
              />
              <path
                fill="#ffffff"
                d="M272 544.3c72.6 0 133.6-24 178.2-65.1l-86.4-68c-24 16.1-54.8 25.7-91.8 25.7-70.6 0-130.4-47.7-151.9-111.8H30.1v70.2C74.4 477.5 165.2 544.3 272 544.3z"
              />
              <path
                fill="#ffffff"
                d="M120.1 324.9c-9.5-28.3-9.5-58.7 0-87l-90-70.2C-11 223-11 321.3 30.1 394.9l90-70z"
              />
              <path
                fill="#ffffff"
                d="M272 107.7c39.5 0 75.1 13.6 103.1 40.4l77.1-77.1C405.6 25.1 344.6 0 272 0 165.2 0 74.4 66.8 30.1 159.1l90 70.2c21.5-64.1 81.3-111.6 151.9-111.6z"
              />
            </svg>
          </Button>
        )}
      </div>
    </header>
  );
}
