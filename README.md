# Churuli

## Overview

Churuli is a comprehensive travel planning and tracking application that helps users plan, visualize, and share their adventures around the world. With an intuitive interface and powerful features, Churuli makes travel planning seamless and enjoyable.

## Features

- **Trip Planning**: Create detailed trip itineraries with locations, dates, and activities
- **Interactive Globe**: Visualize your journeys on an interactive 3D globe
- **AI Travel Guide**: Get personalized travel recommendations and itineraries powered by AI
- **Trip Management**: Organize and manage all your trips in one place
- **Location Tracking**: Add and track locations for each of your trips
- **Itinerary Builder**: Create and reorder your travel itinerary with a drag-and-drop interface
- **Authentication**: Secure Google authentication for user accounts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## User Flow

1. **Sign In**: Users sign in with their Google account
2. **Dashboard**: View all planned and past trips
3. **Create Trip**: Set up a new trip with title, description, dates, and locations
4. **Add Locations**: Search and add locations to your trip
5. **Build Itinerary**: Organize your trip day by day
6. **AI Guide**: Get AI-powered recommendations for your destination
7. **Globe View**: Visualize all your trips on an interactive globe
8. **Share**: Option to share your adventures with friends

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Prisma with PostgreSQL
- **Authentication**: NextAuth.js with Google OAuth
- **File Storage**: UploadThing
- **Maps & Globe**: React Globe.gl
- **Deployment**: Vercel

## Installation

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- PostgreSQL database
- Google OAuth credentials

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/churuli_travel.git
cd churuli_travel
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/world_voyage"

# Authentication
AUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Groq
GROQ_API_KEY="your-groq-api-key"

# Google Map
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-map-api-key"

# UploadThing (for file uploads)
UPLOADTHING_TOKEN="your-uploadthing-secret"
```

4. Set up the database:

```bash
npx prisma migrate dev

npm prisma generate
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy
