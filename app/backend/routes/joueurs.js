const express = require('express')
const Joueur = require('../models/joueur')
const moment = require('moment')
moment.locale('fr')

// Déclaration du routeur
let router = express.Router()
let title = 'Joueurs'

// Définition de la route d'entrée sur le serveur
// Général
router.route('/joueurs')
.get((req, res) => {
    Joueur.find()
    .then(joueurs => {
        res.render('mains/joueurs', { title, joueurs })
    })
    .catch(err => {
        req.retour('error', err.toString())
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
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    })
})

// Mise à jour
router.route('/joueurs/:id')
.get((req, res, next) => {
    let id = req.params.id
    if(id === 'new') return next()

    Joueur.findById(id).exec()
    .then(joueur => {
        joueur.datef = moment(joueur.dateNaiss).format('YYYY-MM-DD')
        res.render('forms/joueurs', { title, put: `/${joueur._id}?_method=PUT`, joueur })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    })
}, (req, res) => {
    res.render('forms/joueurs', { title, put: '', joueur: {} })
})
.put((req, res) => {
    let id = req.params.id
    Joueur.findById(id).exec()
    .then(joueur => {
        for(i in req.body) joueur[i] = req.body[i]
        return joueur.save()
    })
    .then(() => {
        req.retour('success', 'Joueur mis à jour')
        res.redirect('/joueurs')
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    })
})
.delete((req, res) => {
    let _id = req.params.id

    Joueur.deleteOne({ _id }).exec()
    .then(() => {
        req.retour('success', 'Joueur supprimé')
        res.redirect('/joueurs')
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    })
})

// Détail
router.route('/joueur/:id')
.get((req, res) => {
    let id = req.params.id

    Joueur.findById(id).exec()
    .then(joueur => {
        joueur.datef = moment(joueur.dateNaiss).format('LL')
        res.render('details/joueurs', { title, joueur })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    })
})


module.exports = router