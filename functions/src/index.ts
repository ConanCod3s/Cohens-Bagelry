/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Create a Nodemailer transporter using MailerLite API
const transporter = nodemailer.createTransport({
    service: "MailerLite",
    auth: {
        user: process.env.MAILERLITE_API_KEY || "", // Ensure the environment variable is used
        pass: "",
    },
});

// Firestore trigger function
export const sendOrderEmail = functions.firestore
    .document("orders/{orderId}")
    .onWrite(async (change, context) => {
        // Get the order data from the Firestore event
        const orderData = change.after.exists ? change.after.data() : null;

        if (!orderData) {
            console.log("No order data found.");
            return null;
        }

        const email = orderData.email;
        const firstName = orderData.firstName;

        if (!email || !firstName) {
            console.log("Missing email or first name in order data.");
            return null;
        }

        const subject = "Order Confirmation";
        const body = `Thank you for your order, ${firstName}! Your order details: ${JSON.stringify(orderData)}`;

        // Send email using Nodemailer
        try {
            await transporter.sendMail({
                from: "your-email@example.com", // Replace with your email address
                to: email,
                subject: subject,
                text: body,
            });
            console.log(`Email sent to ${email}.`);
        } catch (error) {
            console.error("Error sending email:", error);
        }

        return null;
    });
