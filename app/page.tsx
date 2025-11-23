import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

// Import necessary UI components
import CtaButton from "@/components/cta-button";
import HeroButtons from "@/components/hero-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Featured destinations
const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2874",
    description:
      "Experience the stunning white-washed buildings and crystal blue waters of the Aegean Sea.",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940",
    description:
      "Explore ancient temples, beautiful gardens, and traditional Japanese culture.",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2940",
    description:
      "Discover the mystical ruins of this ancient Incan citadel in the Andes mountains.",
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938",
    description:
      "Relax on beautiful beaches or immerse yourself in the rich cultural heritage.",
  },
  {
    id: 5,
    name: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2940",
    description:
      "Experience the romantic Paris, taste the food, enjoy the art, and feel the culture.",
  },
  {
    id: 6,
    name: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2940",
    description: "Experience the rich culture and history of Tokyo, Japan.",
  },
];

export default async function Home() {
  // Get authentication status
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section - Ultra Modern with Bluish Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-cyan-900 to-sky-800">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.3),rgba(255,255,255,0))]" />
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
          <div className="absolute bottom-8 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-6000" />
        </div>
        
        {/* Background image with advanced overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2940"
            alt="World travel"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-7xl mx-auto">
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 animate-in fade-in slide-in-from-top-4 duration-1000">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-medium">Join 10,000+ Happy Travelers</span>
            </div>

            {/* Main heading */}
            <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              <span className="block text-6xl md:text-7xl lg:text-9xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-300 leading-tight tracking-tight">
                Explore
              </span>
              <span className="block text-5xl md:text-6xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-200 to-cyan-200 leading-tight tracking-tight">
                Without Limits
              </span>
            </h1>

            {/* Subtitle - Extended tagline */}
            <p className="text-xl md:text-3xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Your AI-powered travel companion that turns dreams into
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200"> unforgettable journeys</span>
            </p>

            {/* CTA Buttons */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <HeroButtons isAuthenticated={isAuthenticated} />
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-white/80 animate-in fade-in duration-1000 delay-700">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Forever Plan</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section - Glassmorphism Cards */}
      <section className="py-32 bg-gradient-to-b from-white via-blue-50/30 to-cyan-50/30 relative" id="how-it-works">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Section header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-700 text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Simple & Powerful
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-800">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to transform your travel dreams into reality
            </p>
          </div>
          
          {/* Feature cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 1 - Plan */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <Card className="relative h-full bg-white/80 backdrop-blur-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:scale-105 overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">1</div>
                  </div>

                  <CardTitle className="text-3xl font-bold mb-4 text-gray-900">Plan Your Journey</CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    Create detailed trip itineraries with AI-powered suggestions. Add locations, dates, activities, and let our platform handle the rest.
                  </CardDescription>

                  {/* Feature list */}
                  <ul className="mt-6 space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>AI-powered recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Budget tracking</span>
                    </li>
                  </ul>
                </CardHeader>
              </Card>
            </div>

            {/* Card 2 - Track */}
            <div className="group relative lg:mt-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-sky-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <Card className="relative h-full bg-white/80 backdrop-blur-xl border-2 border-cyan-100 hover:border-cyan-300 transition-all duration-500 hover:shadow-2xl hover:scale-105 overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-sky-400/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">2</div>
                  </div>

                  <CardTitle className="text-3xl font-bold mb-4 text-gray-900">Track Adventures</CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    Visualize your journey on interactive maps and globes. Watch your travel story unfold in stunning real-time.
                  </CardDescription>

                  {/* Feature list */}
                  <ul className="mt-6 space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Interactive 3D globe</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time updates</span>
                    </li>
                  </ul>
                </CardHeader>
              </Card>
            </div>

            {/* Card 3 - Share */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <Card className="relative h-full bg-white/80 backdrop-blur-xl border-2 border-sky-100 hover:border-sky-300 transition-all duration-500 hover:shadow-2xl hover:scale-105 overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-sky-400/30 to-blue-400/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">3</div>
                  </div>

                  <CardTitle className="text-3xl font-bold mb-4 text-gray-900">Share Memories</CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    Share your experiences with friends or keep them private. Every journey tells a unique story worth preserving.
                  </CardDescription>

                  {/* Feature list */}
                  <ul className="mt-6 space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Photo albums</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Travel journals</span>
                    </li>
                  </ul>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations - Ultra Modern */}
      <section className="py-32 bg-gradient-to-b from-cyan-50/30 via-blue-50/30 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Section header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-700 text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Trending Destinations
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-800">
              Where Will You Go?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover breathtaking locations handpicked by our community of explorers
            </p>
          </div>

          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent className="-ml-6">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={destination.id}
                  className="pl-6 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative h-[500px] rounded-3xl overflow-hidden bg-black shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
                        priority
                      />
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between p-8">
                      {/* Top badge */}
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Popular
                        </span>
                      </div>

                      {/* Bottom content */}
                      <div className="space-y-4 transform transition-all duration-500 group-hover:-translate-y-2">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                            {destination.name}
                          </h3>
                          <p className="text-white/90 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            {destination.description}
                          </p>
                        </div>

                        {/* Action area */}
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                          {isAuthenticated && (
                            <Button
                              asChild
                              className="bg-white text-black hover:bg-gray-100 shadow-xl rounded-full px-6 font-semibold"
                            >
                              <Link href="/trips/new" className="flex items-center gap-2">
                                Explore Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </Link>
                            </Button>
                          )}
                          <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Controls */}
            <div className="flex justify-center mt-12 gap-4">
              <CarouselPrevious className="relative static translate-y-0 w-14 h-14 rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-110" />
              <CarouselNext className="relative static translate-y-0 w-14 h-14 rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-110" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section - Ultra Modern with Bluish Theme */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Main content */}
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Your Journey
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-200">
                  Starts Today
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
                Join our global community of travelers and start creating unforgettable memories
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-6">
              <CtaButton isAuthenticated={isAuthenticated} />
              <p className="text-white/80 text-sm">
                No credit card required • Free forever plan available
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-white">10K+</div>
                <div className="text-white/80 font-medium">Active Travelers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-white">50K+</div>
                <div className="text-white/80 font-medium">Trips Created</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-white">150+</div>
                <div className="text-white/80 font-medium">Countries</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-white">4.9★</div>
                <div className="text-white/80 font-medium">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
