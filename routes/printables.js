const express = require('express');
const router = express.Router();


const InvForm = require('../models/Papers');
const { ensureAuthenticated } = require('../config/auth');
const lastPrint = require('../models/LastPrint');
const passport = require('passport');


router.get('/', ensureAuthenticated, (req, res) => res.render('printables', {
  user: req.user
}));



router.get('/:DocType', ensureAuthenticated, (req, res) => {

  const filter = { DocType: req.params.DocType }
  const doc = { $inc: { invNumber: 1 } }
  const option = { upsert: true, new: true, runValidators: true }

  try {
    InvForm.findOneAndUpdate(
      filter, doc, option, async (err, data) => {
        if (err) {
          console.log(err);
          res.send(500).status;
        } else {
          res.render('invoiceformpage',
            {
              invform: data,
              user: req.user
            })
          const date = new Date();
          const datevalues = [
            date.getFullYear() + '/',
            date.getMonth() + 1 + '/',
            date.getDate() + ' - ',
            date.getHours() + ':',
            date.getMinutes() + ':',
            date.getSeconds()
          ];

          let now = datevalues.toString();
          var stripped = now.replace(/,(?!["{}[\]])/g, "");
          const lastprint = new lastPrint({
            username: req.user.name,
            invNumber: data.invNumber,
            docType: data.DocType,
            printedAt: stripped
          })
          console.log({
            lastprint
          })
          lastprint.save()
        }
      })
  } catch (e) {
    console.log(e.message)
  }
});

module.exports = router; 