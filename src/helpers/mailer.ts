import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const verifyEmailHtml = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`;
    const forgotPasswordHtml = `<p>Click <a href="${process.env.DOMAIN}/forgot-password?token=${hashedToken}">here</a> to reset your password <br> ${hashedToken}</p>`;

    // console.log(emailType, userId, email);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 36000000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordtoken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b1d4a8e60c7ff7", // 🔥
        pass: "064dd43c91af56", // 🔥
      },
    });

    const mailOption = {
      from: '"shivamdubeyagra8@gmail.com', // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // Subject line
      //   text: "Hello world?", // plain text body
      html: emailType === "VERIFY" ? verifyEmailHtml : forgotPasswordHtml, // html body
    };

    const mailResponse = await transport.sendMail(mailOption);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
