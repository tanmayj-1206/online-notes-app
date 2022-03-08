const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
    }
});

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = Verification;