import DropboxResetPasswordEmail from "@/emails/verificationemail";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Hello world",
      react: DropboxResetPasswordEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "mail sent" };
  } catch (error) {
    console.error("Error sending email", error);
    return {
      success: false,
      message: "Error sending mail",
    };
  }
};
