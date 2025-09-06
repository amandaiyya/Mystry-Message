import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import React from "react";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const emailComponent = React.createElement(VerificationEmail, {
        username,
        otp: verifyCode,
      });
      
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: emailComponent,
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}