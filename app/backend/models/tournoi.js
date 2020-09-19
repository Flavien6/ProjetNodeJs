// Inclusion des librairies
const mongoose = require('mongoose')

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
    isFin: Boolean
})

module.exports = mongoose.model('Tournoi', tournoiSchema)