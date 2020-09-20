const express = require('express')
const Participant = require('../models/participant')
const Joueur = require('../models/joueur')
const Tournoi = require('../models/tournoi')
const moment = require('moment')
moment.locale('fr')

// Déclaration du routeur
let router = express.Router()
let title = 'Joueurs'

router.route('/inscription/:id')
.post(async (req, res) => {
    try {
        let idJoueur = req.params.id
        let idTournoi = req.body.tournoi
        let joueur = await Joueur.findById(idJoueur).exec()
        let tournoi = await Tournoi.findById(idTournoi).exec()

        if(!tournoi.isStart) {
            if(!tournoi.isOpen) {
                tournoi.isOpen = true
                await tournoi.save()
            }

            let participant = new Participant({
                joueur: joueur._id,
                tournoi: tournoi._id,
                couleurs: { b: 0, n: 0 },
                pts: 0,
                isElimine: false,
                adversaires: []
            })
    
            await participant.save()

            req.retour('success', 'Inscription du joueur réalisé')
            res.redirect(`/joueur/${idJoueur}`)
        }
        else {
            req.retour('error', 'Tournoi Commencé')
            res.redirect(`/joueur/${idJoueur}`)
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    }
})
.delete(async (req, res) => {
    try {
        let _id = req.params.id
        let participant = await Participant.findById(_id).populate('tournoi')

        if(!participant.tournoi.isStart) {
            Participant.deleteOne({ _id }).exec()
            req.retour('success', 'Joueur désinscrit')
            res.redirect(`/joueur/${participant.joueur}`)
        }
        else {
            req.retour('error', 'Tournoi commencé')
            res.redirect(`/joueur/${participant.joueur}`)
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/joueurs')
    }
})


module.exports = router