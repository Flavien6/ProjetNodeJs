const fn = require('../config/fonctions')

// Initialise la ronde suisse, découpe le groupe de joueur en plusieurs groupes de deux
// Tire au hasard une couleur au premier joueur et attributs des couleurs aux autres
exports.initialiser = groupe => {
    if(!Array.isArray(groupe)) throw 'Le groupe doit être un tableau'

    groupe = fn.randomize(groupe)
    let groupes = [], g1 = [], g2 = []
    let couleurs = ['B', 'N']
    let couleur1 = couleurs[Math.round(Math.random())]
    let couleur2 = couleur1 === 'B'? 'N' : 'B'


    for(let i = 0; i < groupe.length; i++) {
        let id = i+1

        // Si id impair
        if((id%2)) {
            g1.push({
                name: groupe[i],
                id,
                couleur: couleur1
            })
        }
        // Si id pair
        else {
            g2.push({
                name: groupe[i],
                id,
                couleur: couleur2
            })
        }
    }

    for(let i = 0; i < g1.length; i++) {
        if(!g2[i]) g2[i] = { id: 0, couleur: couleur2 }
        groupes.push([g1[i], g2[i]])
    }

    return groupes
}

// Calcul les points à attribuer au joueur en foncion de son résultat
exports.calculPoints = (type, joueur) => {
    if(joueur === null || joueur === undefined || !joueur.pts) throw 'Joueur invalide'
    switch(type) {
        case 'v':
            joueur.pts++
            return joueur
        case 'p':
            return joueur
        case 'e':
            joueur.pts = joueur.pts + 0.5
            return joueur
        default:
            throw 'Type incorrect'
    }
}

// Détermine les prochains affrontements à partir d'un tableaux de joueur et de leurs points
exports.determineAffrontements = groupe => {

}

// Fin de partie, divise le groupe en plusieurs groupe dans l'ordre de leurs points
exports.finir = groupe => {

}