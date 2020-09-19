const express = require('express')
const Joueur = require('../models/joueur')

// Déclaration du routeur
let router = express.Router()
let title = 'Joueurs'

// Définition de la route d'entrée sur le serveur
router.route('/joueurs')
.get((req, res) => {
    Joueur.find()
    .then(joueurs => {
        res.render('mains/joueurs', { title, joueurs })
    })
    .catch(err => {
        req.retour('error', err)
        res.redirect('/')
    })
})
.post((req, res) => {
    let joueur = new Joueur(req.body)
    joueur.save()
    .then(() => {
        req.retour('success', 'Ajout du joueur avec succés')
        res.redirect('/joueurs')
    })
    .catch(err => {
        req.retour('error', err)
        res.redirect('/joueurs')
    })
})

router.route('/joueurs/:id')
.get((req, res, next) => {
    let id = req.params.id
    if(id === 'new') return next()

    Joueur.findById(id).exec()
    .then(joueur => {
        res.render('forms/joueurs', { title, joueur })
    })
    .catch(err => {
        req.retour('error', err)
        res.redirect('/joueurs')
    })
}, (req, res) => {
    res.render('forms/joueurs', { title, joueur: {} })
})
// .put(joueurs.update)
// .delete(joueurs.remove)

module.exports = router