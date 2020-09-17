const express = require('express')
const joueurs = require('../bdd/controller')('Joueurs', 'joueurs', 'Joueur')

// Déclaration du routeur
let router = express.Router()

// Définition de la route d'entrée sur le serveur
router.route('/joueurs')
.get(joueurs.getAll)
.post(joueurs.add)

router.route('/joueurs/:id')
.get(joueurs.get, joueurs.empty)
.put(joueurs.update)
.delete(joueurs.remove)

module.exports = router