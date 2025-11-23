import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
  async session({ session, user }) {
    if (!session.user) return session;

    session.user.id = user.id;

    try {
      const guide = await prisma.localGuide.findUnique({
        where: { userId: user.id },
      });
      session.user.isGuide = !!guide;
    } catch (err) {
      console.error("Guide lookup failed in session callback:", err);
      session.user.isGuide = false;
    }

    return session;
  },
},
  basePath: "/api/auth",
});
