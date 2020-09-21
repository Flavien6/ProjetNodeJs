const express = require('express')
const User = require('../models/users')

// Déclaration du routeur
let router = express.Router()
let title = 'Utilisateurs'

// Définition de la route d'entrée sur le serveur
// Général
router.route('/users')
.get((req, res) => {
    User.find()
    .then(users => {
        res.render('mains/users', { title, users })
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/')
    })
})
.post((req, res) => {
    let user = new User(req.body)
    user.save()
    .then(() => {
        req.retour('success', 'Ajout de l\'utilisateur avec succés')
        res.redirect('/users')
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/users')
    })
})

// Mise à jour
router.route('/users/:id')
.get((req, res, next) => {
    let id = req.params.id
    if(id === 'new') return next()

    User.findById(id).exec()
    .then(user => {
        if(user) {
            res.render('forms/users', { title, put: `/${user._id}?_method=PUT`, user })
        }
        else {
            req.retour('error', 'Utilisateur inexistant')
            res.redirect('/users')
        }
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/users')
    })
}, (req, res) => {
    res.render('forms/users', { title, put: '', user: {} })
})
.put((req, res) => {
    let id = req.params.id
    User.findById(id).exec()
    .then(user => {
        for(i in req.body) user[i] = req.body[i]
        return user.save()
    })
    .then(() => {
        req.retour('success', 'Utiisateur mis à jour')
        res.redirect('/users')
    })
    .catch(err => {
        req.retour('error', err.toString())
        res.redirect('/users')
    })
})
.delete(async (req, res) => {
    try {
        let _id = req.params.id
        await User.deleteOne({ _id }).exec()
        req.retour('success', 'Utilisateur supprimé')
        res.redirect('/users')
    }
    catch(err) {
        req.retour('error', err.toString())
        res.redirect('/users')
    }
})

module.exports = router