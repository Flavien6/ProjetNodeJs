const fn = require('./fonctions')

// Initialise la ronde suisse, découpe le groupe de joueur en plusieurs groupes de deux
// Tire au hasard une couleur au premier joueur et attributs des couleurs aux autres
exports.initialiser = groupe => {
    if(!Array.isArray(groupe)) throw 'Le groupe doit être un tableau'

    groupe = fn.randomize(groupe)
    let groupes = [], g1 = [], g2 = []
    let couleur1 = this.randCouleurs()
    let couleur2 = couleur1 === 'b'? 'n' : 'b'


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

// Détermine une couleur aléatoire
exports.randCouleurs = () => {
    let couleurs = ['b', 'n']
    return couleurs[Math.round(Math.random())]
}

// Détermine le nmbre de ronde pour un match en elimination directe
exports.nombreRondes = nbParticipants => {
    if(typeof nbParticipants !== 'number') throw 'Le nombre de participants doit être un nombre'
    return ((nbParticipants + (nbParticipants%2)) / 2)
}

// Détermine les prochains affrontements à partir d'un tableaux de joueur et de leurs points
exports.determineAffrontements = groupe => {
    return [[1,2][1,2]]
}