import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";


export async function POST(request: Request){
    await dbConnect()

    const {username, content} = await request.json()

    try {
        const user = await UserModel.findOne({username})
        
        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found" 
                },
                {status: 404}
            )
        }

        if(!user.isAcceptingMessage){
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting the messages"
                },
                {status: 403}
            )
        }

        const newMessage = {
            content,
            createdAt: new Date()
        }

        user.messages.push(newMessage as Message)
        user.save()

        return Response.json(
            {
                success: true,
                message: "Message sent successfully"
            },
            {status: 200}
        )
    } catch (error) {
        console.log("Error sending messages ", error)
        return Response.json(
            {
                success: false,
                message: "Error Sending messages"
            },
            {status: 500}
        )
    }
}