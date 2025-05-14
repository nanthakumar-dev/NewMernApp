const nodemailer=require('nodemailer')

exports.sendEmail= async options=>{
    
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f78cbef7e740e6",
        pass: "e90f5b4814cb24"
      }
    });
      
    const message={
        from:`${process.env.SEND_NAME}<${process.env.SEND_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transport.sendMail(message)

}
