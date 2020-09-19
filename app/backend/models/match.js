// Inclusion des librairies
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Schéma Match
const matchSchema = mongoose.Schema({
    tournoi: {
        type: ObjectId,
        ref: 'Tournoi'
    },
    ronde: Number,
    vainqueur: {
        type: ObjectId,
        ref: 'Participant'
    },
    participants: {
        type: [{
            type: ObjectId,
            ref: 'Participant'
        }],
        min: 2, max:2,
        required: true
    }
})

module.exports = mongoose.model('Match', matchSchema)