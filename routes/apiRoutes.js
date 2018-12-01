const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail.setApiKey('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');
var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  //friend invetation page
  app.get("/api/friend", (req, res) => {
    res.render("friend");
  });

  app.post("/api/friend", (req, res) => {
    console.log(req.body);
    const output = `

    <p>You have a new gift exchange invitation request</p>
    <h3>Invitation Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    <p><a href="https://fathomless-eyrie-21415.herokuapp.com/">Click here to join the party</a></p>
  `;
    const msg = {
      to: req.body.email,
      from: '"Gezahegn Worku" <gezahegnw@gmail.com>', // sender address
      subject: 'Gift exchange invitation',
      text: 'You are invited to our chirstmas gif exchange party',
      html: output,
    };
    sgMail
      .send(msg)
      .then(() => {
        //Celebrate
        res.send("email sent");
      })
      .catch(error => {

        //Log friendly error
        console.error(error.toString());

        //Extract error msg
        const { message, code, response } = error;

        //Extract response msg
        const { headers, body } = response;
      });    //res.send("Email sent");
  });



  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });
<<<<<<< HEAD
=======

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
>>>>>>> 2181d0c1d1d0f118007b10d79a4174083d580537
};
