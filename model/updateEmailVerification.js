const mongoose = require('mongoose');

const updateEmailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    newEmail: {
        type: String,
        remove: true
    }
})

const UpdateEmail = mongoose.model('UpdateEmail', updateEmailSchema);

module.exports = UpdateEmail;