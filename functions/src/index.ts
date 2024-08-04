import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

// Initialize Firebase Admin SDK
admin.initializeApp();

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

// Firestore trigger function
export const sendOrderEmail = functions.firestore
  .document("orders/{orderId}")
  .onWrite(async (change, context) => {
    console.log("Function triggered");

    if (!change.after.exists) {
      console.log("Document deleted");
      return null;
    }

    const orderData = change.after.data();
    console.log(orderData);

    if (!orderData) {
      console.log("No data found in the document");
      return null;
    }

    const email = orderData.email;
    const firstName = orderData.firstName;

    if (!email || !firstName) {
      console.log("Missing email or first name in order data");
      return null;
    }

    const subject = "Order Confirmation";
    const body = `Thank you for your order, ${firstName}! Your order details: ${JSON.stringify(
      orderData
    )}`;

    try {
      const result = await sendMail(email, subject, body, "");
      console.log("Email sent: " + result.response);
    } catch (error) {
      console.error("Error sending email: ", error);
    }

    return null;
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
