import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {verifySchema} from "@/schemas/verifySchema";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username, code} = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const result = verifySchema.safeParse({code: code})

        if(!result.success){
            const codeErrors = result.error.format().code?._errors || []

            return Response.json(
                {
                    success: false,
                    message: codeErrors?.length > 0 
                        ? codeErrors.join(', ')
                        : "Invalid code parameter structure",
                },
                { status: 400 }
            )
        }

        const codeParam = result.data.code || ''

        const user = await UserModel.findOne({
            username: decodedUsername
        })

        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 500 }
            )
        }

        const isCodeValid = user.verifyCode === codeParam;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "User verified successfully",
                },
                { status: 200 }
            )
        } else if(!isCodeNotExpired){
            return Response.json(
                {
                    success: false,
                    message: "Verification code has expired, please signup again to get a new code",
                },
                { status: 400 }
            )
        } else{
            return Response.json(
                {
                    success: false,
                    message: "Incorrect verification code",
                },
                { status: 400 }
            )
        }
    } catch (error) {
        console.log("Error verifying user",error)
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            },
            { status: 500 }
        )
    }
}