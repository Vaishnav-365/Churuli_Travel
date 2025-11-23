import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const userName = session?.user?.name || "A traveler";
    const userEmail = session?.user?.email;

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: "User not authenticated",
      });
    }

    const { guideId, startDate, endDate } = await req.json();

    if (!guideId || !startDate || !endDate) {
      return NextResponse.json({
        success: false,
        error: "Missing booking fields",
      });
    }

    // 1️⃣ Fetch guide details
    const guide = await prisma.localGuide.update({
      where: { id: guideId },
      data: {
        status: "booked",
        currentTripId: `${startDate} to ${endDate}`,
      },
    });

    // 2️⃣ Create a booking record
    const booking = await prisma.booking.create({
      data: {
        userId,
        guideId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    // 3️⃣ Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ---------------------------------------------------------------------
    // 📩 Email Template for Guide
    // ---------------------------------------------------------------------
    const guideEmailHTML = `
    <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
      <div style="max-width:600px; margin:auto; background:white; padding:25px; border-radius:10px;">
        <h2 style="color:#2b6cb0;">📌 You’ve Been Booked!</h2>

        <p>Hello <strong>${guide.name}</strong>,</p>

        <p>You have been booked by <strong>${userName}</strong> for a guided trip.</p>

        <h3 style="color:#2f855a;">📅 Trip Details</h3>
        <p><strong>Start:</strong> ${startDate}</p>
        <p><strong>End:</strong> ${endDate}</p>

        <h3 style="color:#d69e2e;">👤 Traveler Contact</h3>
        <p>Email: <strong>${userEmail}</strong></p>

        <br>
        <p>Kindly prepare for the trip and ensure communication with the traveler.</p>

        <p style="margin-top:25px;">– <strong>Churuli Team</strong></p>
      </div>
    </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: guide.email,
      subject: "📌 You Have Been Booked as a Guide!",
      html: guideEmailHTML,
    });

    // ---------------------------------------------------------------------
    // 📩 Email Template for User (includes guide phone + guide email)
    // ---------------------------------------------------------------------
    const userEmailHTML = `
    <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
      <div style="max-width:600px; margin:auto; background:white; padding:25px; border-radius:10px;">
        <h2 style="color:#2f855a;">🎉 Your Guide Booking is Confirmed!</h2>

        <p>Hello <strong>${userName}</strong>,</p>

        <p>Your guide has been successfully booked. Below are the details.</p>

        <h3 style="color:#3182ce;">🧑‍✈️ Guide Details</h3>
        <p><strong>Name:</strong> ${guide.name}</p>
        <p><strong>Email:</strong> ${guide.email}</p>
        <p><strong>Phone:</strong> ${guide.phone || "Not Provided"}</p>

        <h3 style="color:#d69e2e;">📅 Trip Dates</h3>
        <p><strong>Start:</strong> ${startDate}</p>
        <p><strong>End:</strong> ${endDate}</p>

        <br>

        <p>Please contact your guide to discuss meeting point, itinerary, and any preparations.</p>

        <p style="margin-top:25px;">– <strong>Churuli Team</strong></p>
      </div>
    </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "🎉 Guide Booking Confirmed!",
      html: userEmailHTML,
    });

    return NextResponse.json({ success: true, guide, booking });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}

