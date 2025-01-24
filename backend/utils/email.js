require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.EMAIL_ID,
      to: option.email,
      subject: option.subject,
      html: option.message,
    };

    await transporter.sendMail(mailOption);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

const mailTemplate = (content, buttonUrl, buttonText) => {
  return `<!DOCTYPE html>
  <html>
  <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
    <div
      style="
        max-width: 400px;
        margin: 10px;
        background-color: #fafafa;
        padding: 25px;
        border-radius: 20px;
      "
    >
      <p style="text-align: left;">
        ${content}
      </p>
      <a href="${buttonUrl}" target="_blank">
        <button
          style="
            background-color: #444394;
            border: 0;
            width: 200px;
            height: 30px;
            border-radius: 6px;
            color: #fff;
          "
        >
          ${buttonText}
        </button>
      </a>
      <p style="text-align: left;">
        If you are unable to click the above button, copy paste the below URL into your address bar
      </p>
      <a href="${buttonUrl}" target="_blank">
          <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">
            ${buttonUrl}
          </p>
      </a>
    </div>
  </body>
</html>`;
};

module.exports = { sendEmail, mailTemplate };
