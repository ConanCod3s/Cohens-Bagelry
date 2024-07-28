import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

// Configure the email transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Orders@cohensbagelry.com',
        pass: 'your-email-password'
    }
});

export const sendEmail = functions.https.onRequest((request, response) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: request.body.to,
        subject: request.body.subject,
        text: request.body.text,
        html: request.body.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            response.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            response.status(200).send('Email sent');
        }
    });
});
