import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcrypt';
import { User } from 'next-auth';
// import { JWT } from 'next-auth/jwt';

interface credentialsReturnProps{
    _id: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    username: string;
}

export const authOptions: NextAuthConfig = {
    providers: [
        credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email/Password"},
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise< credentialsReturnProps | null>{
                const {identifier, password} = credentials

                if(!identifier || !password){
                    throw new Error("Credentials are required")
                }

                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: identifier},
                            {username: identifier}
                        ]
                    })

                    if(!user){
                        throw new Error("No user found with this email")
                    }

                    if(!user.isVerified){
                        throw new Error("Please verify your accound before login")
                    }

                    const isPasswordCorrect = await bcrypt.compare(String(password), user.password)

                    if(!isPasswordCorrect){
                        throw new Error("Incorrect Password")
                    } 
                    
                    return {
                        _id: String(user._id),
                        isVerified: user.isVerified,
                        isAcceptingMessages: user.isAcceptingMessage,
                        username: user.username
                    };
                } catch (error: unknown) {
                    if(error instanceof Error)
                    throw new Error(error.message);

                    throw new Error("An unknown error occured")
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
              session.user._id = token._id;
              session.user.isVerified = token.isVerified;
              session.user.isAcceptingMessages = token.isAcceptingMessages;
              session.user.username = token.username;
            }
            return session;
          }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}