const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        unique: true,
        required: true
    }
});

const Reset = mongoose.model('Reset', resetSchema);

module.exports = Reset;