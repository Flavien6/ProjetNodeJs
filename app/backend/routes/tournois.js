const express = require('express')
const Tournoi = require('../models/tournoi')
const Participant = require('../models/participant')
const Match = require('../models/match')
const Joueur = require('../models/joueur')
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
    req.body.rondeEnCours = 1
    req.body.nbParticipants = 0
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
            req.body.rondeEnCours = 1
            req.body.nbParticipants = 0
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
.get(async (req, res) => {
    try {
        let id = req.params.id
        let tournoi = await Tournoi.findById(id).exec()
        let participants = await Participant.find({ tournoi : id }).populate('joueur').exec()
        let matchs = await Match.find({ tournoi: id }).populate('participants').exec()
        for(let i = 0; i < matchs.length; i++) {
            matchs[i].participants = await new Promise((res, rej) => {
                Joueur.populate(matchs[i].participants, { path: 'joueur' }, (err, matchsFill) => {
                    if(err) return rej(err)
                    res(matchsFill)
                })
            })
        }

        matchs.forEach(elt => {
            elt.participants.forEach(element => {
                let i = participants.findIndex(participant => participant._id.toString() == element._id.toString())
                if((i > -1 && elt.ronde === tournoi.rondeEnCours) || element.isElimine) participants.splice(i, 1)
            })
        })

        tournoi.datef = moment(tournoi.date).format('LL')
        res.render('details/tournois', { title, tournoi, participants, matchs })
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})


module.exports = router