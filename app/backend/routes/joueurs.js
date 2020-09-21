const express = require('express')
const Joueur = require('../models/joueur')
const Tournoi = require('../models/tournoi')
const Participant = require('../models/participant')
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
        if(joueur) {
            joueur.datef = moment(joueur.dateNaiss).format('YYYY-MM-DD')
            res.render('forms/joueurs', { title, put: `/${joueur._id}?_method=PUT`, joueur })
        }
        else {
            req.retour('error', 'Joueur inexistant')
            res.redirect('/joueurs')
        }
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
.delete(async (req, res) => {
    try {
        let _id = req.params.id
        let participants = await Participant.find({ joueur: _id }).exec()
        if(participants.length === 0) {
            await Joueur.deleteOne({ _id }).exec()
            req.retour('success', 'Joueur supprimé')
            res.redirect('/joueurs')
        }
        else {
            req.retour('error', 'Joueur déjà inscrit')
            res.redirect('/joueurs')
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    }
})

// Détail
router.route('/joueur/:id')
.get(async (req, res) => {
    try {
        let id = req.params.id
        let joueur = await Joueur.findById(id).exec()
        let tournois = await Tournoi.find().exec()
        let inscriptions = await Participant.find({ joueur: joueur._id }).populate('tournoi').exec()

        joueur.datef = moment(joueur.dateNaiss).format('LL')
        tournois.forEach(elt => {
            elt.datef = moment(elt.date).format('LL')
        })
        tournois.forEach(elt => {
            if(elt.isStart) tournois.splice(tournois.indexOf(elt), 1)
        })
        inscriptions.forEach(elt => {
            elt.tournoi.datef = moment(elt.tournoi.date).format('LL')

            let i = tournois.findIndex(tournoi => tournoi._id.toString() == elt.tournoi._id.toString())
            if(i > -1) tournois.splice(i, 1)
        })

        res.render('details/joueurs', { title, joueur, inscriptions, tournois })
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    }
})


module.exports = router