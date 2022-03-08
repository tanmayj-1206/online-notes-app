const Notes = require('../model/notes');
const User = require('../model/users');

module.exports.showNotes = async function(req, res){
    try{
        let note = await Notes.deleteMany({content: ''});
        console.log(note);
        let notes = await Notes.find({user: req.user._id}).sort('-updatedAt');
        return res.status(200).json({
            data: notes,
            message: 'notes sent'
        });
    }catch(err){
        return res.status(422).json({
            message: 'Oops! Failed to load the notes'
        })
        console.log(err);
    }
}

module.exports.createNote = async function(req, res){
    try{
        let note = await Notes.create({
            content: '',
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: note
            })
        }
    }catch(err){
        return res.status(422).json({
            message: 'Oops! Failed to create the note'
        })
        console.log(err);
    }
}

module.exports.updateNotes = async function(req, res){
    try{
        let note = await Notes.findByIdAndUpdate(req.body.id, {content: req.body.content});
        note = await Notes.findById(req.body.id);
        return res.status(200).json({
            data: note, 
            message: 'note updated'
        });
    }catch(err){
        return res.status(422).json({
            message: 'Oops! Failed to update the note'
        })
        console.log(err);
    }
    
}

module.exports.getNote = async function(req, res){
    try{
        console.log(req.body.id)
        let note = await Notes.findById(req.body.id);
        return res.status(200).json({
            data: note,
            message: 'note sent'
        })
    }catch(err){
        return res.status(422).json({
            message: 'Oops! Failed to get the note'
        })
        console.log(err);
    }
    
}

module.exports.deleteNote = async function(req, res){
    try{
        let note = await Notes.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            data: req.params.id,
            message: 'note deleted'
        });
    }catch(err){
        return res.status(422).json({
            message: 'Oops! Failed to delete the note'
        })
        console.log(err);
    }
}