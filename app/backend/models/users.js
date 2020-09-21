// Inclusion des librairies
const mongoose = require('mongoose')

// Schéma User
const userSchema = mongoose.Schema({
    mail: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)