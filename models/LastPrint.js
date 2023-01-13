const mongoose = require('mongoose');


const LastPrintSchema = new mongoose.Schema({

    username : {
        type: String,
        ref: 'User'
    },
    invNumber : {
        type: Number,
        ref: 'Paper'
    },
    docType : {
        type: String,
        ref: 'Paper'
    },
    printedAt: {
        type: String,
        default: Date.now
      }
});

const LastPrint = mongoose.model('LastPrint', LastPrintSchema);

module.exports = LastPrint;