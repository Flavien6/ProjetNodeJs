// Inclusion des librairies
const mongoose = require('mongoose')

// Schéma Equipe
const equipeSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    joueurs1: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Joueur'
    },
    joueurs2: {
        type: mongoose.Types.ObjectId,
        ref: 'Joueur'
    }
})

module.exports = mongoose.model('Equipe', equipeSchema)