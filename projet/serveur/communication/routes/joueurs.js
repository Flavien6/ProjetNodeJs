const express = require('express')
const joueurs = require('../bdd/controllers/joueur')

// Déclaration du routeur
let router = express.Router()

// Définition de la route d'entrée sur le serveur
router.route('/joueurs')
.get(joueurs.getAll)
.post(joueurs.add)

router.route('/joueurs/:id').get(joueurs.get, joueurs.new)

module.exports = router