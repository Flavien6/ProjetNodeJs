// Inclusion des librairies
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Schéma Tournoi
const tournoiSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    systeme: {
        type: String,
        required: true
    },
    nbRondes: {
        type: Number,
        required: true
    },
    vainqueur: {
        type: ObjectId,
        ref: 'Participant'
    },
    rondeEnCours: Number,
    nbParticipants: Number,
    isOpen: Boolean,
    isStart: Boolean,
    isFin: Boolean
})

module.exports = mongoose.model('Tournoi', tournoiSchema)