import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Server is running!');
});

app.post('/send-email', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_User,
                pass: process.env.EMAIL_PASS
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_User,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        })

        res.status(200).send({
            success: true,
            message: 'Email sent successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error sending email'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});