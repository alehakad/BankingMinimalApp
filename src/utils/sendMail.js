import nodemailer from 'nodemailer';

const senderEmail = process.env.SENDER_EMAIL;
const senderAppPassword = process.env.SENDER_APP_KEY;


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: senderEmail,
        pass: senderAppPassword,
    },
});

function sendPasscode(receiverEmail, passcode) {
    const mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: "Passcode Email to activate Bank App account",
        text: `Hello! This is your passcode : ${passcode}`,
    };

    transporter.sendMail(mailOptions)
        .then(info => console.log("Email sent successfully:", info.response))
        .catch(error => console.error("Error sending email:", error));
}

if (import.meta.url === `file://${process.argv[1]}`) {
    sendPasscode("", "123456")
}