const express = require('express')
const Match = require('../models/match')
const Participant = require('../models/participant')
const Tournoi = require('../models/tournoi')
const processmatch = require('../processus/match')
const moment = require('moment')
moment.locale('fr')

// Déclaration du routeur
let router = express.Router()
let title = 'Joueurs'

router.route('/match/:id')
.post(async (req, res) => {
    try {
        let idTournoi = req.params.id
        let tournoi = await Tournoi.findById(idTournoi).exec()
        let participant1 = await Participant.findById(req.body.j1).exec()
        let participant2 = await Participant.findById(req.body.j2).exec()

        if(!tournoi.isFin) {
            if(!tournoi.isStart) {
                tournoi.isStart = true
                if(tournoi.nbRondes === 0) tournoi.nbRondes = processmatch.nombreRondes(tournoi.nbParticipants)
                await tournoi.save()

                if(tournoi.nbParticipants%2 === 1) {
                    let ghost = new Participant({
                        tournoi: tournoi._id
                    })

                    await ghost.save()
                }
            }

            if(participant1.joueur) {
                participant1.couleurs.enCours = processmatch.randCouleurs()
                participant1.couleurs[participant1.couleurs.enCours] = participant1.couleurs[participant1.couleurs.enCours] + 1
                participant1.adversaires.push(participant2._id)
                await participant1.save()
            }
            if(participant2.joueur) {
                participant2.couleurs.enCours = participant1.couleurs.enCours === 'b'? 'n' : 'b'
                participant2.couleurs[participant2.couleurs.enCours] = participant2.couleurs[participant2.couleurs.enCours] + 1
                participant2.adversaires.push(participant1._id)
                await participant2.save()
            }

            let match = new Match({
                tournoi: idTournoi,
                ronde: tournoi.rondeEnCours,
                participants: [
                    participant1._id,
                    participant2._id
                ]
            })

            await match.save()

            req.retour('success', 'Match ajouté')
            res.redirect(`/tournoi/${idTournoi}`)
        }
        else {
            req.retour('error', 'Tournoi Fini')
            res.redirect(`/tournoi/${idTournoi}`)
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})
.put(async (req, res) => {
    try {
        let _id = req.params.id
        let vainqueur = req.body.vainqueur
        let match = await Match.findById(_id).populate('tournoi participants')

        let participants = match.participants.filter(elt => elt.joueur)
        let index = participants.findIndex(elt => vainqueur === elt._id)
        if(index === -1) vainqueur = participants[0]._id
        match.vainqueur = vainqueur
        match.save()

        let joueurV = await Participant.findById(vainqueur).exec()
        joueurV.pts = joueurV.pts + 1
        joueurV.save()
        
        let indexPerdant = match.participants.findIndex(elt => vainqueur.toString() !== elt._id.toString())

        if(indexPerdant !== -1) {
            let joueurP = await Participant.findById(match.participants[indexPerdant]._id).exec()
            joueurP.isElimine = true
            joueurP.save()
        }

        req.retour('success', 'Match terminé')
        res.redirect(`/tournoi/${match.tournoi._id}`)
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})
.delete(async (req, res) => {
    try {
        let _id = req.params.id
        let match = await Match.findById(_id).populate('tournoi')

        if(!match.tournoi.isFin) {
            Match.deleteOne({ _id }).exec()
            req.retour('success', 'Match annulé')
            res.redirect(`/tournoi/${match.tournoi._id}`)
        }
        else {
            req.retour('error', 'Tournoi fini')
            res.redirect(`/tournoi/${match.tournoi._id}`)
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})

router.route('/match/validate/:id')
.post(async (req, res) => {
    try {
        let _id = req.params.id
        let tournoi = await Tournoi.findById(_id).exec()
        let matchs = await Match.find({ tournoi: tournoi._id, ronde: tournoi.rondeEnCours }).exec()
        let vainqueur = await Participant.find({ tournoi: tournoi._id }).sort({pts:-1}).limit(1) 
        let ok = true
        if(matchs.length > 0) {
            matchs.forEach(elt => {
                if(!elt.vainqueur) ok = false
            })
        }
        else ok = false

        if(ok) {
            if(tournoi.rondeEnCours === tournoi.nbRondes) tournoi.isFin = true
            else tournoi.rondeEnCours = tournoi.rondeEnCours + 1
            if(tournoi.isFin) {
                tournoi.vainqueur = vainqueur[0]._id
            }
            await tournoi.save()
            req.retour('success', 'Ronde Terminé')
            res.redirect(`/tournoi/${_id}`)
        }
        else {
            req.retour('error', 'Résultats non renseignés')
            res.redirect(`/tournoi/${_id}`)
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})

router.route('/match/auto/:id')
.get(async (req, res) => {
    try {
        let _id = req.params.id
        let tournoi = await Tournoi.findById(_id).exec()
        if(tournoi) {
            let participants = await Participant.find({ tournoi: tournoi._id }).exec()
            let matchsOk = await Match.find({ tournoi: tournoi._id }).exec()
            if(tournoi.rondeEnCours === 1 && !tournoi.isFin && matchsOk.length < tournoi.nbRondes) {
                await Match.deleteMany({ tournoi: tournoi._id }).exec()
                let matchs = processmatch.initialiser(participants)
    
                matchs.forEach((elt, i) => {
                    elt.forEach((participant, y) => {
                        if(participant.name) {
                            participant.name.couleurs.enCours = participant.couleur
                            matchs[i][y] = participant.name
                        }
                        else {
                            let part = new Participant({
                                tournoi: tournoi._id
                            })
                            matchs[i][y] = part
                        }
                    })
                })
    
                for(let i = 0; i < matchs.length; i++) {
                    await matchs[i][0].save()
                    await matchs[i][1].save()
                    let match = new Match({
                        tournoi: tournoi._id,
                        ronde: 1,
                        participants: [matchs[i][0]._id, matchs[i][1]._id]
                    })
                    await match.save()
                }
    
                if(!tournoi.isStart) {
                    tournoi.isStart = true
                    if(tournoi.nbRondes === 0) tournoi.nbRondes = processmatch.nombreRondes(tournoi.nbParticipants)
                    await tournoi.save()
                }
            }
    
            req.retour('success', 'Auto')
            res.redirect(`/tournoi/${_id}`)    
        }
        else {
            req.retour('error', 'Tournoi inexistant')
            res.redirect('/tournois')
        }
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/tournois')
    }
})


module.exports = router