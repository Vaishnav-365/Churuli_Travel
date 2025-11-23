import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location")?.trim() ?? "";

    console.log("API Received Location:", location);

    const guides = await prisma.localGuide.findMany({
      where: location
        ? {
            OR: [
              {
                location: {
                  equals: location,
                  mode: "insensitive",
                },
              },
              {
                location: {
                  contains: location,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
    });

    const bookings = userId
      ? await prisma.booking.findMany({
          where: { userId, status: "active" },
          include: { guide: true },
        })
      : [];

    return NextResponse.json({
      success: true,
      guides,
      activeBookings: bookings,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

