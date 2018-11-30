var nodemailer = require("nodemailer");
var xoauth2 = require("xoauth2");
app.post("api/friend", (req, res) => {
  const output = `
    <p>You have a new gift exchange invitation request</p>
    <h3>Invitation Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'gezahegnw@gmail.com',
        clientId: '1008612881954-eb3jlceohhmck7hbnb5dgjttomp152a0.apps.googleusercontent.com',
        clientSecret: 'VutY31CDw91L3piY0ASaQNNA',
        refreshToken: '/bJSWhxZjQ1Y9T-e3YCCxq4ZoN31mzpic-Y2zGqheIhTQ'
      })
    },


    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Gezahegn Worku" <gezahegnw@gmail.com>', // sender address
    to: "gezahegnw@gmail.com", // list of receivers
    subject: "Gift exchnage invitation", // Subject line
    text: "You are invited to our chirstmas gif exchange party", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("friend", { msg: "Email has been sent" });
  });
});

