// Intégration des librairies
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const errors = require('./error')

/**
 * Configuration du serveur
 */

const port = process.env.SRVPORT || 3000
const dbConf = process.env
const stringConnection = `mongodb://${dbConf.USER}:${dbConf.PASSWORD}@${dbConf.HOST}:${dbConf.PORT}/${dbConf.NAME}`

// Déclaration de la variable d'utilisation d'ExpressJs
let app = express()

// Définition du rendu des pages dans express
app.set('views', 'srv/views')
app.set('view engine', 'pug')

// Utilisation des plugins de detection du format de la réponse des requêtes POST
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Intégration des routes
app.use(require('./routers/home'))
app.use(require('./routers/joueurs'))
app.use(require('./routers/suivis'))
app.use(require('./routers/tournois'))

// Gestion des erreurs
app.use(errors.error404)
app.use(errors.error500)

// Fonction de lancement du serveur
exports.connexion = async () => {
    // Lancement du serveur
    try {
        await mongoose.connect(stringConnection, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Base de donnée sur l'adresse : ${dbConf.HOST}:${dbConf.PORT}`)
        await app.listen(port)
        console.log(`Serveur sur écoute à l'adresse : http://127.0.0.1:${port}`)
    }
    catch(err) {
        throw err
    }
}