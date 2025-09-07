import NextAuth from "next-auth";
import liteAuthOptions from "./app/api/auth/[...nextauth]/options-lite";

export const { auth } = NextAuth(liteAuthOptions)