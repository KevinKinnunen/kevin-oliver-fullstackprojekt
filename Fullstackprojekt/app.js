//#region Useful npm packages:
/* 
npm init -y
npm i express mongoose
npm i --save-dev nodemon
npm install nodemailer -s
npm i dotenv
npm install ejs
npm install googleapis nodemailer
npm i bcryptjs
npm install morgan
npm install helmet
npm install cors

*/
//#endregion

//#region Schedule:
/*

###Date: 2021-03-09###

Hjälp:
Kryptera det som skickas till mailen via gmail api?
- BcryptJs?
https://www.npmjs.com/package/bcryptjs#usage---sync

Verifering för att inte bli bottad via ReCaptcha?
- Hur gör man via server-side (Jag kan göra via client-side)?
https://www.google.com/recaptcha/about/

Lägga till Swish betalningsmetod?
- Skulle bara vara ett plus för andra som bor i Sverige.

Glöm inte:
- Skicka mer info till paypal angående företaget.
- Fixa sociala medierna (Texten, om oss, osv). 
- Ett nummer för vårat företag? (Vi vill inte använda vårat privata).

*/
//#endregion

// Imports
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const express = require('express')
const { response, request, text } = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const bcrypt = require('bcryptjs');

// Environment variables for sending mail
const PORT = process.env.PORT || 5000;

const app = express()

// Securing by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(
  helmet({
    contentSecurityPolicy: false, // Can't use paypal function / map otherwise.
  })
);

// HTTP request logger. 
app.use(morgan('dev'))

// Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
app.use(cors())

//console.log(process.env)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

// Render index
app.get('', (req, res) => {
  res.render('index')
})

// Sending mails using gmail api
app.post('/contact', async (req, res) => {
  const OAuth2 = google.auth.OAuth2;
  async function sendMail() {
    let name = req.body.name
    let email = req.body.email
    let subject = req.body.subject
    let message = req.body.message

    try {
      const createTransporter = async () => {
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN
        });

        const accessToken = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err, token) => {
            if (err) {
              reject("Failed to create access token :(");
            }
            resolve(token);
          });
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
          }
        });

        return transporter;
      };

      const sendEmail = async (emailOptions) => {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
      };

      sendEmail({
        subject: `${subject}`,
        text: `${message}`,
        to: process.env.EMAIL,
        from: `${name} ${email} ${email}`, 
      });

      const result = {
        subject: `${subject}`,
        text: `${message}`,
        to: process.env.EMAIL,
        from: `${name} <${email}>`
      }

      return result

    } catch (error) {
      return error;
    }
  }

  sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
  res.redirect('/')
})

// Listen on port 5000
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))


