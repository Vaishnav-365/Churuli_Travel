import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = await prisma.emailOTP.findUnique({ where: { email } });
  if (!record) return Response.json({ error: "Not found" }, { status: 404 });

  if (record.verified) return Response.json({ success: true });

  if (record.otp !== otp) return Response.json({ error: "Invalid OTP" }, { status: 400 });

  if (record.expiresAt < new Date())
    return Response.json({ error: "Expired OTP" }, { status: 400 });

  await prisma.emailOTP.update({
    where: { email },
    data: { verified: true },
  });

  return Response.json({ success: true });
}

