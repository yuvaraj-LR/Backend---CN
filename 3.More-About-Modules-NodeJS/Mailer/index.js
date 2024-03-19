const nodeMailer = require("nodemailer");

async function sendMail() {

    // 1. Create a transporter using SMPT of nodeMailer.
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "yuvarajrama121@gmail.com",
            pass: "xrou ppfu ocyq qwrw"
        }
    });

    // 2. Configure the mail. 
    const mailOptions = {
        from: "yuvarajrama121@gmail.com",
        to: "cs205114663@bhc.edu.in",
        subject: "Sample - 1",
        text: "This is sample mail from NodeJs"
    }

    // 3. Send Mail.
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.log("Email was not sent.", error);
    }
}

// Call the function.
sendMail();