const nodemailer = require('nodemailer')




module.exports = {

  sendMail: async ({ to, subject, html }) => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.NODEMAILER_GMAIL,
          pass: process.env.NODEMAILER_PASS
        },
      });

      const mailOptions = {
        from: process.env.NODEMAILER_GMAIL,
        to: to,
        subject: subject,
        html: html,
      };

      const mailS = await transporter.sendMail(mailOptions)
      if (mailS) {

        console.log('Email sent:' + mailS.response);
      }
    } catch (err) {
      console.log(err);
    }

  }


}