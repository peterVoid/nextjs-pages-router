import CreadentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signInWithGoogle } from "@/utils/db/service";

const authUser: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CreadentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });
        if (user) {
          const match = await compare(password, user.password);
          if (match) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    jwt: async ({ token, account, profile, user }: any) => {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          email: user.email,
          fullname: user.name,
          image: user.image,
          type: "google",
        };
        await signInWithGoogle(
          data,
          (result: { status: boolean; message: string; ret: any }) => {
            if (result.status) {
              token.email = result.ret.email;
              token.username = result.ret.fullname;
              token.image = result.ret.image;
              token.role = result.ret.role;
              token.type = result.ret.type;
            }
          }
        );
      }
      return token;
    },

    async session({ session, token, user }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }

      if ("role" in token) {
        session.user.role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authUser);
