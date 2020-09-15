const express = require('express')

// Déclaration du routeur
let router = express.Router()

// Configuration du template de la page
let page = {
    page: 'Joueurs'
}

// Définition de la route d'entrée sur le serveur
router.route('/joueurs').get((req, res) => {
    res.render('joueurs', page)
})

module.exports = router