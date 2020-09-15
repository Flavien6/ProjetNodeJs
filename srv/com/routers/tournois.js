const express = require('express')

// Déclaration du routeur
let router = express.Router()

// Configuration du template de la page
let page = {
    page: 'Tournois'
}

// Définition de la route d'entrée sur le serveur
router.route('/tournois').get((req, res) => {
    res.render('tournois', page)
})

module.exports = router