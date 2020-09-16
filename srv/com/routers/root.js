const express = require('express')

// Déclaration du routeur
let router = express.Router()

// Configuration du template de la page
let page = {
    page: 'Accueil'
}

// Définition de la route d'entrée sur le serveur
router.route('/').get((req, res) => {
    res.render('index', page)
})

router.route('*').get((req, res, next) => {
    let err = new Error()
    err.status = 404
    next(err)
})

module.exports = router