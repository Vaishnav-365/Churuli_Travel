import { auth } from "@/auth";
import NotLogin from "@/components/not-login";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { CalendarIcon, MapIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  const pastTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) < today
  );

  if (!session) {
    return <NotLogin />;
  }

  const TripCard = ({ trip }: { trip: any }) => (
    <Link href={`/trips/${trip.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-all border-2 hover:border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
            <Badge
              variant={
                new Date(trip.startDate) >= today ? "default" : "outline"
              }
            >
              {new Date(trip.startDate) >= today ? "Upcoming" : "Past"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-1">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[40px]">
            {trip.description || "No description provided"}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>
              {new Date(trip.startDate).toLocaleDateString()} -{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-2 pb-3">
          <div className="flex items-center text-sm">
            <MapIcon className="mr-1 h-4 w-4" />
            <span>
              {trip.locations?.length || 0}{" "}
              {trip.locations?.length === 1 ? "location" : "locations"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );

  const EmptyState = () => (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-primary/10 p-3 mb-4">
          <MapIcon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">No trips yet</h3>
        <p className="text-center mb-6 max-w-md text-muted-foreground">
          Start planning your adventure by creating your first trip.
        </p>
        <Link href="/trips/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Trip
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            Trips Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and plan your adventures
          </p>
        </div>
        <Link href="/trips/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Trip
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Welcome back, {session.user?.name || "Traveler"}
          </CardTitle>
          <CardDescription>
            {trips.length === 0
              ? "Start planning your first trip by clicking the New Trip button."
              : `You have ${trips.length} ${
                  trips.length === 1 ? "trip" : "trips"
                } planned. ${
                  upcomingTrips.length > 0
                    ? `${upcomingTrips.length} upcoming.`
                    : ""
                }`}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="upcoming" className="relative">
              Upcoming
              {upcomingTrips.length > 0 && (
                <Badge variant="secondary" className="ml-2 px-1.5">
                  {upcomingTrips.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="all">All Trips</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTrips.length === 0 ? (
              <div className="col-span-full">
                <EmptyState />
              </div>
            ) : (
              upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.length === 0 ? (
              <div className="col-span-full">
                <EmptyState />
              </div>
            ) : (
              sortedTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastTrips.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-muted-foreground">
                      No past trips to show
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              pastTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
