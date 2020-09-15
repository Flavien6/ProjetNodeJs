// Intégration des librairies
const express = require('express')
const bodyParser = require('body-parser')

/**
 * Configuration du serveur
 */

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

// Fonction de lancement du serveur
async function connexion() {
    // Lancement du serveur
    try {
        await app.listen(3000)
        console.log('Serveur sur écoute à l\'adresse : http://127.0.0.1:3000')
    }
    catch(err) {
        throw err
    }
}

module.exports = {
    connexion : connexion
}