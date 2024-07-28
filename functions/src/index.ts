import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

// Initialize OAuth2Client with your credentials
const oAuth2Client = new OAuth2Client(
  functions.config().gmail.client_id,
  functions.config().gmail.client_secret,
  functions.config().gmail.redirect_uri
);

// Set the refresh token
oAuth2Client.setCredentials({
  refresh_token: functions.config().gmail.refresh_token,
});

async function sendMail(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: functions.config().gmail.email,
        clientId: functions.config().gmail.client_id,
        clientSecret: functions.config().gmail.client_secret,
        refreshToken: functions.config().gmail.refresh_token,
        accessToken: accessToken.token || "",
      },
    });

    const mailOptions = {
      from: functions.config().gmail.email,
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
}

export const sendEmail = functions.https.onRequest(
  async (request, response) => {
    try {
      const result = await sendMail(
        request.body.to,
        request.body.subject,
        request.body.text,
        request.body.html
      );
      response.status(200).send("Email sent: " + result.response);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error sending email");
    }
  }
);
