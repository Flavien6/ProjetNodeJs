const express = require('express')
const User = require('../models/users')

// Déclaration du routeur
let router = express.Router()

// Définition de la route d'entrée sur le serveur
router.route('/auth').get((req, res) => {
    delete req.session.auth
    delete res.locals.auth
    req.retour('success', 'Déconnexion réussi')
    res.render('auth', {
        title: 'Connexion'
    })
})
.post((req, res) => {
    let login = req.body.login
    let pw = req.body.pw

    User.findOne({ mail: login, pw }).exec()
    .then(user => {
        if(user) {
            req.session.auth = login
            req.retour('success', 'Connecté')
            res.redirect('/')
        }
        else {
            delete req.session.auth
            req.retour('error', 'Login ou mot de passe erroné')
            res.redirect('/auth')
        }
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/auth')
    })
})

module.exports = router