import nodemailer from 'nodemailer';
import sendgrid from '@sendgrid/mail';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from 'twilio';
 const client =twilio("AC3999303a49836192f6e01503aff547e9","9201edc0fae88fc88af6f36e465b6538");
const helper={
    generateOtp:()=>{
    let otp=''
    for (let i= 0; i < 3; i++){
       const rv= Math.round(Math.random()*9);
       otp=otp+rv;
}
     return otp;
},
mailTransport:()=>{

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    });
    return transport;
},
sendMail:(email,subject,text,html)=>{
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to:email,
  from: 'rentish7474@gmail.com', 
  subject: subject,
  text: text,
  html:html,
}
sendgrid.send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
},
sendSMS:(number,text)=>{

console.log("twilio")
 const  pnumber='+91'+number;
  client.messages
    .create({
       body: text,
       from: '+19035609372',
       to: pnumber
     })
    .then(message => console.log(message.sid));

}

}
export default helper