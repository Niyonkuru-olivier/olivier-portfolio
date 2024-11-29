// Required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Middleware to parse incoming JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the port
const PORT = process.env.PORT || 3000;

// Nodemailer configuration (you can replace with your email credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can also use other services like SendGrid or Mailgun
    auth: {
        user: 'your-email@gmail.com', // Replace with your email address
        pass: 'your-email-password'   // Replace with your email password (or app-specific password)
    }
});

// POST route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, reason, message } = req.body;

    // Prepare email content
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'oniyonkuru44@gmail.com', // Your email address to receive the messages
        subject: `New message from ${name} regarding ${reason}`,
        text: `
            You have received a new message!

            Name: ${name}
            Email: ${email}
            Reason: ${reason}

            Message:
            ${message}
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Message sent successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
