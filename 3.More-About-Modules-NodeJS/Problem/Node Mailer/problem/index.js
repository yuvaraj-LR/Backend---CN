// Please don't change the pre-written code
// Import the necessary modules here
import nodemailer from 'nodemailer';
import readline from 'readline';

const Solution = () => {
  // Write your code here

  // 1. Create the transporter.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj"
    }
  });

  // getting senders email.
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question("please enter your mail ", (mailId) => {

    // 2. Mail Options.
    const mailOption = {
      from : "codingninjas2k16@gmail.com",
      to: mailId,
      subject: "Coding Ninjas",
      text: "The world has enough coders; be a coding ninja!"
    };

    // 3. Send Mail.
    try {
      transporter.sendMail(mailOption);
      console.log(`Success: Email sent to ${mailId}`);
    } catch (error) {
      console.log("Failed! ", error);
    }
  });

};

export default Solution;
