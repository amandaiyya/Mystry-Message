import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
    request: Request,
    {params}: {params: {messageid: string}}
){
    await dbConnect()
    const messageId = params.messageid
    const session = await handler.auth()
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
                    _id: messageId
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