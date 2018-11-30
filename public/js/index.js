// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $giftImage = $("#gift-image");
var $giftGiver = $("#giver-text");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
 
  
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
  
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // }

};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim(),
    gifter: $giftGiver.val().trim(),
    gift: $giftImage.val().trim()
  };

  if (!(example.text && example.description && example.gifter && example.gift)) {
    alert("You must enter all fields to join the party!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
  $giftImage.val("");
  $giftGiver.val("");
};
// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
//=================================================================================================
//the code below this line is for nodemailer
app.post("/send", (req, res) => {
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

  // create reusable smtpTransporter object using the default SMTP transport
  let smtpTransporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
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
  smtpTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("friend", { msg: "Email has been sent" });
  });
  smtpTransport.close();
});
//};
