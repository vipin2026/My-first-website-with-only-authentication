const nodemailer = require('nodemailer')




module.exports = {

  sendMail: async ({ to, subject, html }) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
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

  },

  sentOtp: async ({phoneNumber,body}) => {
    console.log(phoneNumber , body ,"yr arhi hai")
    const accountSid = 'AC4459e9ee9e5813a07c53251ab244466f';
    const authToken = 'ac20835e223a907b67aa43ac263e87a8';
    const client = require('twilio')(accountSid, authToken);

    try {
      const message =await  client.messages.create({
        body: body,
        from: '+12562293021',
        to:phoneNumber      //'+918708558265'
    })
    console.log(message.sid,"message hogya")
    
    } catch (err) {
        console.error(err);
    }
},







}