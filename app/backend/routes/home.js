const express = require('express')

// Déclaration du routeur
let router = express.Router()

// Définition de la route d'entrée sur le serveur
router.route('/').get((req, res) => {
    res.render('index', {
        title: 'Accueil'
    })
})

module.exports = router