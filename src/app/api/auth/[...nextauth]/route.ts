import NextAuth from "next-auth";
import { authOptions } from "./options";

export const handler = NextAuth(authOptions)

export const GET = handler.handlers.GET;
export const POST = handler.handlers.POST;