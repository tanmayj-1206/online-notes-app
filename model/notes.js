const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    content: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedAt1: {
        type: Date
    }
}, {timestamps: true});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;