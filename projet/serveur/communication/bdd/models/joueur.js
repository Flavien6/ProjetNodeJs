// Inclusion des librairies
const mongoose = require('mongoose')

// Schéma Joueur
const joueurSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    dateNaiss: {
        type: Date,
        required: true
    },
    mail: {
        type: String
    }
})

module.exports = mongoose.model('Joueur', joueurSchema)