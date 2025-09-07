import { NextAuthConfig } from "next-auth";

const liteOptions: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: []
};

export default liteOptions;
