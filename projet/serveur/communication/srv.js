// Intégration des librairies
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const conf = require('../config/config')

/**
 * Configuration du serveur
 */

const port = conf.srv.port || 3000
const stringConnection = `mongodb://${conf.db.user}:${conf.db.pw}@${conf.db.host}:${conf.db.port}/${conf.db.name}`

// Déclaration de la variable d'utilisation d'ExpressJs
let app = express()

// Définition du rendu des pages dans express
app.set('views', './projet/client/views')
app.set('view engine', 'pug')

// Utilisation des plugins de detection du format de la réponse des requêtes POST
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Intégration des routes
app.use(require('./routes/joueurs'))
app.use(require('./routes/suivis'))
app.use(require('./routes/tournois'))
app.use(require('./routes/home'))

// Route par défaut représentant toutes les routes
app.get('*', (req, res, next) => {
    let err = new Error()
    next({...err, status: 404, msg: 'Page non trouvée.'})
})

// Middleware de traitement des erreurs
app.use((err, req, res, next) => {
    res.status(err.status).render('error', {
        title: `Erreur ${err.status}`,
        status: err.status,
        msg: err.msg
    })
})

// Fonction de lancement du serveur
exports.connexion = async () => {
    // Lancement du serveur
    try {
        await mongoose.connect(stringConnection, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Connecté à la BDD (${conf.db.name}) sur l'adresse : ${conf.db.host}:${conf.db.port} - en tant que : ${conf.db.user}`)
        await app.listen(port)
        console.log(`Serveur sur écoute à l'adresse : http://127.0.0.1:${port}`)
    }
    catch(err) {
        throw err
    }
}