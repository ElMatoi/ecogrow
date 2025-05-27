import { Logger } from "@nestjs/common";
import { createTransport } from "nodemailer";
import { getEnvValue } from "src/config/config.service";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: getEnvValue("GMAIL_USER"),
    pass: getEnvValue("GMAIL_PASS"),
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
): Promise<void> {
  try {
    const emailHtmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 1px solid #eee; padding-bottom: 15px;">
          <h1 style="color: #007bff;">Through Work</h1>
          <p style="font-size: 14px; color: #555;">Imagine what you want.</p>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #007bff; margin-bottom: 20px;">Hello, ${to}</h2>
          <p style="font-size: 16px; color: #333;">
            ${subject}
          </p>
          <p style="font-size: 16px; color: #333;">
            ${text}
          </p>
          <a href="[Action Link]" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 16px; margin-top: 20px;">Take Action</a>
        </div>
        <div style="text-align: center; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
          <p style="font-size: 12px; color: #888;">
            If you have any questions, feel free to contact us at 
            <a href="mailto:support@yourcompany.com" style="color: #007bff;">support@yourcompany.com</a>
          </p>
          <p style="font-size: 12px; color: #888;">
            &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Ecogrow" <${getEnvValue("GMAIL_USER")}>`,
      to,
      subject,
      text,
      html: emailHtmlContent,
    });

    Logger.log(`Email sent to ${to}: ${info.response}`);
  } catch (error) {
    Logger.error(`Error sending email: ${error}`);
  }
}