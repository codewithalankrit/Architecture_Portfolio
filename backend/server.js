const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001; // Backend server port

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure your SMTP transporter here
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "webartisanos@gmail.com", // Replace with your SMTP username
    pass: "hfbd isxy bdyu zxvb", // Replace with your SMTP password
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, comments } = req.body;

  const mailOptions = {
    from: '"Website Contact" <al.aggarwal2005@gmail.com>', // sender address
    to: "webartisanos@gmail.com", // list of receivers (owner's email)
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nComments: ${comments}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send email" });
    }
    console.log("Email sent:", info.response);
    res.json({ success: true, message: "Email sent successfully" });
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
