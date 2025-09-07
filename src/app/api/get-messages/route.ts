import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
// import { handler } from "../auth/[...nextauth]/route";
// import { handler } from "@/auth";
import mongoose from "mongoose";
import { auth } from "@/auth";

export async function GET(request: Request){
    await dbConnect()

    // const session = await handler.auth()
    const session = await auth()

    const user: User = session?.user as User

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },
            {status: 401}
        )
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: {_id: userId} },
            { $unwind: {
                path: '$messages',
                preserveNullAndEmptyArrays: true
             },
            },
            { $sort: {'messages.createdAt': -1} },
            { $group: {
                _id: '$_id',
                messages: {$push: '$messages'}
            } }
        ])

        if(!user || user.length === 0){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {status: 401}
            )
        }

        return Response.json(
            {
                success: true,
                messages: user[0].messages
            },
            {status: 200}
        )
    } catch (error) {
        console.log("Error fetching user messages ", error)
        return Response.json(
            {
                success: false,
                message: "Error fetching user messages"
            },
            {status: 500}
        )
    }
}