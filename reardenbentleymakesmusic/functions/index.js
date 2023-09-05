const cors = require('cors')({origin: true});

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendOrderEmail = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const userEmail = req.body.email;
    const userName = req.body.name;
    const userDetails = req.body.details;

    const template = {
      name: 'order',
      data: {
        name: userName,
        email: userEmail,
        details: userDetails
      }
    };

    try {
      const recipient = 'comms@reardenbentleymakesmusic.com';

      await admin
        .firestore()
        .collection('mail')
        .add({
          to: recipient,
          template: template
        });

      res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ error: 'Error sending email' });
    }
  });
  
});

exports.sendConfirmEmail = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const userEmail = req.body.email;
    const userDetails = req.body.details;

    const template = {
      name: 'confirmation',
      data: {
        details: userDetails
      }
    };

    try {
      const recipient = userEmail;

      await admin
        .firestore()
        .collection('mail')
        .add({
          to: recipient,
          template: template
        });

      res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ error: 'Error sending email' });
    }
  });
  
});