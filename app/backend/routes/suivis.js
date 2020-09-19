const express = require('express')

// Déclaration du routeur
let router = express.Router()

// Configuration du template de la page
let page = {
    title: 'Suivis'
}

// Définition de la route d'entrée sur le serveur
router.route('/suivis').get((req, res) => {
    res.render('viewPages/suivis', page)
})

module.exports = router