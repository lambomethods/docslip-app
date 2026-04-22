import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Important: We import baseClient ONLY for Auth lookup before a session exists!
// Business logic must NEVER import baseClient.
import { PrismaClient } from "@prisma/client";
const authDb = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Provider Login",
      credentials: {
        email: { label: "Email Address", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const provider = await authDb.docslipProvider.findUnique({
          where: { email: credentials.email }
        });

        if (!provider) {
          throw new Error("Invalid login credentials");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, provider.passwordHash);

        if (!isPasswordValid) {
          throw new Error("Invalid login credentials");
        }

        // Return the exact JWT claims specified by the advisor
        return {
          id: provider.id,
          providerId: provider.id,
          role: "PROVIDER_ADMIN",
          email: provider.email,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user object is present (initial login), embed custom claims
      if (user) {
        token.providerId = (user as any).providerId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose claims to the frontend session object
      if (token) {
        session.user = {
          ...session.user,
          providerId: token.providerId as string,
          role: token.role as string,
        } as any;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
