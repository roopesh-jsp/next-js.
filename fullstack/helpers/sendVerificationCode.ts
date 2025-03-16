import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  userName: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "verification Code",
      react: VerificationEmail({ username: userName, otp: verifyCode }),
    });
    return {
      success: true,
      message: "sent mail to the user",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "failed to send email",
    };
  }
}
