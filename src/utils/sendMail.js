import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "",
        pass: ""
    },
})

const mailOptions = {
    from: "",
    to: "",
    subject: "Test Email from Node.js",
    text: "Hello! This is a test email.",
};

transporter.sendMail(mailOptions)
  .then(info => console.log("Email sent successfully:", info.response))
  .catch(error => console.error("Error sending email:", error));