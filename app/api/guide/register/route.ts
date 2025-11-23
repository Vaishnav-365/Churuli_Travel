import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, phone, experience, languages, bio, email } = body;

  if (!name || !email || !phone) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const otp = await prisma.emailOTP.findUnique({ where: { email } });
  if (!otp?.verified) {
    return Response.json({ error: "Email not verified" }, { status: 400 });
  }

  try {
    await prisma.localGuide.create({
      data: {
        userId: session.user.id,
        name,
        email,
        phone,
        experience: Number(experience) || 0,
        languages: Array.isArray(languages) ? languages : languages.split(","),
        bio,
      },
    });
    return Response.json({ success: true });
  } catch (err: any) {
    console.error("Failed to create guide:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
	
