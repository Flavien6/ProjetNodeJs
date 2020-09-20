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
        tournois.forEach(elt => {
            elt.datef = moment(elt.date).format('LL')
        })
        res.render('mains/tournois', { title, tournois })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/')
    })
})
.post((req, res) => {
    let tournoi
    if(!req.body.nbRondes) req.body.nbRondes = 0
    req.body.isOpen = false
    req.body.isStart = false
    req.body.isFin = false
    tournoi = new Tournoi(req.body)
    tournoi.save()
    .then(() => {
        req.retour('success', 'Ajout du tournoi avec succés')
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
    .then(tournoi => {
        tournoi.datef = moment(tournoi.date).format('YYYY-MM-DD')
        res.render('forms/tournois', { title, put: `/${tournoi._id}?_method=PUT`, tournoi })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    })
}, (req, res) => {
    res.render('forms/tournois', { title, put: '', tournoi: {} })
})
.put(async (req, res) => {
    try {
        let id = req.params.id
        let tournoi = await Tournoi.findById(id).exec()
        if(!tournoi.isOpen) {
            if(!req.body.nbRondes) req.body.nbRondes = 0
            req.body.isOpen = false
            req.body.isStart = false
            req.body.isFin = false
            for(i in req.body) tournoi[i] = req.body[i]
            await tournoi.save()
            req.retour('success', 'Tournoi mis à jour')
            res.redirect('/tournois')
        }
        else {
            req.retour('error', 'Tournoi commencé')
            res.redirect('/tournois')
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})
.delete(async (req, res) => {
    try {
        let _id = req.params.id
        let tournoi = await Tournoi.findById(_id).exec()
        if(!tournoi.isOpen) {
            if(!req.body.nbRondes) req.body.nbRondes = 0
            req.body.isOpen = false
            req.body.isStart = false
            req.body.isFin = false
            for(i in req.body) tournoi[i] = req.body[i]
            await Tournoi.deleteOne({ _id }).exec()
            req.retour('success', 'Tournoi supprimé')
            res.redirect('/tournois')
        }
        else {
            req.retour('error', 'Tournoi commencé')
            res.redirect('/tournois')
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})

// Détail
router.route('/tournoi/:id')
.get((req, res) => {
    let id = req.params.id

    Tournoi.findById(id).exec()
    .then(tournoi => {
        tournoi.datef = moment(tournoi.date).format('LL')
        res.render('details/tournois', { title, tournoi })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    })
})


module.exports = router