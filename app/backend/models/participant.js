// Inclusion des librairies
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Schéma Participant
const participantSchema = mongoose.Schema({
    joueur: {
        type: ObjectId,
        ref: 'Joueur'
    },
    tournoi: {
        type: ObjectId,
        ref: 'Tournoi'
    },
    couleurs: {
        b: Number,
        n: Number
    },
    pts: Number,
    isElimine: Boolean,
    adversaires: [
        {
            type: ObjectId,
            ref: 'Participant'
        }
    ]
})

module.exports = mongoose.model('Participant', participantSchema)