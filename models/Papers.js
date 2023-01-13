const mongoose = require('mongoose');
// const User = require('../models/User');


const InvFormSchema = new mongoose.Schema({

    printedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    invNumber: {
        type: Number,
        // require: true
    },

    DocType: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now,
      }
});

const InvForm = mongoose.model('InvForm', InvFormSchema);

module.exports = InvForm;
