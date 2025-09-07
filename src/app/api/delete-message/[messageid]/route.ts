import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
// import { handler } from "@/app/api/auth/[...nextauth]/route";
// import { NextRequest } from "next/server"; 
import { auth } from "@/auth";

// type RouteContext = {
//     params: {
//         messageid: string;
//     }
// }

export async function DELETE(
    request: Request,
    // context: {params: {messageid: string}}
    // context: RouteContext
    {params}: {params: Promise<{messageid: string}>}
){
    await dbConnect()
    // const messageId = params.messageid
    // const {messageid} = await context.params;
    const {messageid} = await params

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

    try {
        const updatedResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {
                messages: {
                    _id: messageid
                }
            }}
        )

        if(updatedResult.modifiedCount === 0){
            return Response.json(
                {
                    success: false,
                    message: "Message not found or already deleted"
                },
                {status: 404}
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message Deleted successfully"
            },
            {status: 200}
        )
    } catch (error) {
        console.log("Error in delete message route ", error)
        return Response.json(
            {
                success: false,
                message: "Error deleting message"
            },
            {status: 500}
        )
    }
}