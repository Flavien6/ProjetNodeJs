// Intégration des librairies
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const { srv, db } = require('./config')
const User = require('./models/users')

/**
 * Configuration du serveur
 */

const port = srv.port || 3000
const stringConnection = `mongodb://${db.user}:${db.pw}@${db.host}:${db.port}/${db.name}`

// Déclaration de la variable d'utilisation d'ExpressJs
let app = express()

// Définition du rendu des pages dans express
app.set('views', './app/frontend/views')
app.set('view engine', 'pug')

// Elements static
app.use('/assets', express.static('./app/frontend/public'))

// Utilisation des plugins de detection du format de la réponse des requêtes POST
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Utilisation de la session
app.use(session({
    secret: 'tournois',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Gestion des retours d'erreurs pour l'utilisateur
app.use(require('./middlewares/retour'))

// Redirection de la méthode pour PUT ou DELETE
app.use(methodOverride('_method'))

// Redirection authentification
app.use(require('./middlewares/auth'))
app.use(require('./middlewares/localAuth'))

// Intégration des routes
app.use(require('./routes/auth'))
app.use(require('./routes/users'))
app.use(require('./routes/joueurs'))
app.use(require('./routes/tournois'))
app.use(require('./routes/participants'))
app.use(require('./routes/matchs'))
app.use(require('./routes/home'))

// Route par défaut représentant toutes les routes
app.get('*', (req, res, next) => {
    let err = new Error()
    next({...err, status: 404, msg: 'Page non trouvée.'})
})

// Middleware de traitement des erreurs
app.use(require('./middlewares/error'))

// Fonction de lancement du serveur
exports.connexion = async () => {
    // Lancement du serveur
    try {
        await mongoose.connect(stringConnection, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Connecté à la BDD (${db.name}) sur l'adresse : ${db.host}:${db.port} - en tant que : ${db.user}`)

        let defaultUsr = await User.findOne({ mail:srv.mail }).exec()
        if(defaultUsr === null) {
            let user = new User({
                mail: srv.mail,
                pw: srv.pw
            })
            await user.save()
            console.log(`Utilisateur par défaut créé - Mail : ${srv.mail}  Mot de passe : ${srv.pw}`)
        }

        await app.listen(port)
        console.log(`Serveur sur écoute à l'adresse : http://127.0.0.1:${port}`)
    }
    catch(err) {
        throw err
    }
}