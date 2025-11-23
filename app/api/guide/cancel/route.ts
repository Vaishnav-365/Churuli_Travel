import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { bookingId, rating, review } = await req.json();

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "cancelled",
        rating,
        review
      },
      include: {
        guide: true,
        user: true
      }
    });

    // update rating avg + count
    const guide = booking.guide;

    const newRatingCount = guide.ratingCount + 1;
    const newRatingValue =
      (guide.ratingValue * guide.ratingCount + rating) / newRatingCount;

    await prisma.localGuide.update({
      where: { id: guide.id },
      data: {
        status: "available",
        ratingCount: newRatingCount,
        ratingValue: newRatingValue
      }
    });

    // send email to guide
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: guide.email,
      subject: "You received a new review",
      text: `
Hello ${guide.name},

${booking.user.name} has cancelled the booking and left a review.

⭐ Rating: ${rating}/5
📝 Review: ${review}

Thank you!
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}

