var nodemailer = require('nodemailer');
var express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oscaralwin@gmail.com',
    pass: 'lhmh cwhq bybl ylgh'
  }
});

app.use(express.json()); 

app.post('/send', (req, res) => {
  const data = JSON.stringify(req.body.message);
  const email = JSON.stringify(req.body.email);
  
  var mailOptions = {
    from: 'oscaralwin@gmail.com',
    to: `${email}`,
    subject: 'Help needed',
    text: `${data}`
  };
  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send email'); // Send error response
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully'); // Send success response
    }
  });
});

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
