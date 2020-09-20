const express = require('express')
const Tournoi = require('../models/tournoi')
const moment = require('moment')
moment.locale('fr')

// Déclaration du routeur
let router = express.Router()
let title = 'Tournois'

// Définition de la route d'entrée sur le serveur
// Général
router.route('/tournois')
.get((req, res) => {
    Tournoi.find()
    .then(tournois => {
        res.render('mains/tournois', { title, tournois })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/')
    })
})
.post((req, res) => {
    let joueur = new Tournoi(req.body)
    joueur.save()
    .then(() => {
        req.retour('success', 'Ajout du joueur avec succés')
        res.redirect('/tournois')
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    })
})

// Mise à jour
router.route('/tournois/:id')
.get((req, res, next) => {
    let id = req.params.id
    if(id === 'new') return next()

    Tournoi.findById(id).exec()
    .then(joueur => {
        joueur.date = moment(joueur.dateNaiss).format('YYYY-MM-DD')
        res.render('forms/tournois', { title, put: `/${joueur._id}?_method=PUT`, joueur })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    })
}, (req, res) => {
    res.render('forms/tournois', { title, put: '', joueur: {} })
})
.put((req, res) => {
    let id = req.params.id
    Tournoi.findById(id).exec()
    .then(joueur => {
        for(i in req.body) joueur[i] = req.body[i]
        return joueur.save()
    })
    .then(() => {
        req.retour('success', 'Tournoi mis à jour')
        res.redirect('/tournois')
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    })
})
.delete((req, res) => {
    let _id = req.params.id

    Tournoi.deleteOne({ _id }).exec()
    .then(() => {
        req.retour('success', 'Tournoi supprimé')
        res.redirect('/tournois')
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    })
})

// Détail
router.route('/joueur/:id')
.get((req, res) => {
    let id = req.params.id

    Tournoi.findById(id).exec()
    .then(joueur => {
        joueur.date = moment(joueur.dateNaiss).format('LL')
        res.render('details/tournois', { title, joueur })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    })
})


module.exports = router