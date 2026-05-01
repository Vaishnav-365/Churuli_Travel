import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt", // 🔐 Explicit and secure
    maxAge: 60 * 60 * 24, // 1 day
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {

    // ✅ Control who can sign in
    async signIn({ profile }) {
      if (!profile?.email) return false;

      // Optional: restrict domain
      // if (!profile.email.endsWith("@yourcollege.edu")) return false;

      return true;
    },

    // ✅ Store data in JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        const guide = await prisma.localGuide.findUnique({
          where: { userId: user.id },
        });

        token.isGuide = !!guide;
      }
      return token;
    },

    // ✅ Expose safe data to frontend
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isGuide = token.isGuide as boolean;
      }
      return session;
    },
  },

  basePath: "/api/auth",
});