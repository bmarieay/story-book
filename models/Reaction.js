const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ['like, heart, haha']
    }, 
    owner: [
        {
            types: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('Reaction', reactionSchema);