import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
export async function checkToken(token: string | undefined) {
  try {
    if (!token) return null;
    const decodedToken = jwt.verify(token, "seceret");
    // console.log(decodedToken);

    return decodedToken;
  } catch (error) {
    console.log(error);
  }
}

export async function sendMail(email: string, data: string) {
  try {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    console.log(email, data);

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a13771b473a644",
        pass: "b1d1ca920d55ca",
      },
    });

    const info = await transport.sendMail({
      from: "rupzkumar5@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `http://localhost:3000/verifyMail?token=${data}`, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    console.log(error);
  }
}
