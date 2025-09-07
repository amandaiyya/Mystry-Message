import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

const liteAuthOptions: NextAuthConfig = {
    providers: [
        credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email/Password" },
                password: { label: "Password", type: "password" },
            },
            async authorize() {
                // This should never be called from middleware
                return null;
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
    
export default liteAuthOptions;