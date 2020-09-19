// lancement du test : mocha nomDuTest.js
// Inclusion de la librairie Must pour les tests Unitaires
let expect = require('must')
// Offre à n'importe quel élement la fonction must pour les tests
require('must/register')
// Inclusion de la fonction à tester
let rondeSuisse = require('../projet/serveur/processus/rondeSuisse')

describe('Initialisation d\' une ronde suisse', () => {
    it('Groupe est différent d\'un tableau', () => {
        expect(() => { rondeSuisse.initialiser(0) }).to.throw()
        expect(() => { rondeSuisse.initialiser('') }).to.throw()
        expect(() => { rondeSuisse.initialiser(null) }).to.throw()
        expect(() => { rondeSuisse.initialiser(undefined) }).to.throw()
    })

    it('Groupe de 4 joueurs', () => {
        let groupes = rondeSuisse.initialiser(['j1', 'j2', 'j3', 'j4'])
        
        groupes.must.length(2)
        groupes[0].must.length(2)
        groupes[1].must.length(2)

        groupes[0][0].must.have.property('id')
        groupes[0][0].id.must.equal(1)
        groupes[0][1].must.have.property('id')
        groupes[0][1].id.must.equal(2)
        groupes[0][0].must.have.property('couleur')
        groupes[0][1].must.have.property('couleur')
        groupes[0][1].couleur.must.not.equal(groupes[0][0].couleur)
    })

    it('Groupe de 5 joueurs', () => {
        let groupes = rondeSuisse.initialiser(['j1', 'j2', 'j3', 'j4', 'j5'])
        
        groupes.must.length(3)
        groupes[0].must.length(2)
        groupes[1].must.length(2)
        groupes[2].must.length(2)
        groupes[2][1].must.have.property('id')
        groupes[2][1].id.must.equal(0)

        groupes[0][0].must.have.property('id')
        groupes[0][0].id.must.equal(1)
        groupes[0][1].must.have.property('id')
        groupes[0][1].id.must.equal(2)
        groupes[0][0].must.have.property('couleur')
        groupes[0][1].must.have.property('couleur')
        groupes[0][1].couleur.must.not.equal(groupes[0][0].couleur)
    })

    it('Groupe de 40 joueurs', () => {
        let groupes = rondeSuisse.initialiser(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10'])
        
        groupes.must.length(20)
        groupes[0].must.length(2)
        groupes[1].must.length(2)
        groupes[2].must.length(2)
        groupes[3].must.length(2)
        groupes[4].must.length(2)
        groupes[5].must.length(2)
        groupes[6].must.length(2)
        groupes[7].must.length(2)
        groupes[8].must.length(2)
        groupes[9].must.length(2)
        groupes[10].must.length(2)
        groupes[11].must.length(2)
        groupes[12].must.length(2)
        groupes[13].must.length(2)
        groupes[14].must.length(2)
        groupes[15].must.length(2)
        groupes[16].must.length(2)
        groupes[17].must.length(2)
        groupes[18].must.length(2)
        groupes[19].must.length(2)
        
        groupes[0][0].must.have.property('id')
        groupes[0][0].id.must.equal(1)
        groupes[0][1].must.have.property('id')
        groupes[0][1].id.must.equal(2)
        groupes[0][0].must.have.property('couleur')
        groupes[0][1].must.have.property('couleur')
        groupes[0][1].couleur.must.not.equal(groupes[0][0].couleur)
    })
})

describe('Calcul des points pour une ronde suisse', () => {

    it('Type et joueurs obligatoires', () => {
        expect(() => { rondeSuisse.calculPoints() }).to.throw()
    })

    it('Type inexistant', () => {
        expect(() => { rondeSuisse.calculPoints('a', {}) }).to.throw()
        expect(() => { rondeSuisse.calculPoints('', {}) }).to.throw()
        expect(() => { rondeSuisse.calculPoints(null, {}) }).to.throw()
        expect(() => { rondeSuisse.calculPoints(undefined, {}) }).to.throw()
    })

    it('Joueur invalide', () => {
        expect(() => { rondeSuisse.calculPoints('v', {}) }).to.throw()
        expect(() => { rondeSuisse.calculPoints('v', null) }).to.throw()
        expect(() => { rondeSuisse.calculPoints('v', undefined) }).to.throw()
    })

    it('Vainqueur', () => {
        let joueur = rondeSuisse.calculPoints('v', { name: 'j1', pts: 2 })
        joueur.must.have.property('pts')
        joueur.pts.must.equal(3)
    })

    it('Perdant', () => {
        let joueur = rondeSuisse.calculPoints('p', { name: 'j1', pts: 2 })
        joueur.must.have.property('pts')
        joueur.pts.must.equal(2)
    })

    it('Egalité', () => {
        let joueur = rondeSuisse.calculPoints('e', { name: 'j1', pts: 2 })
        joueur.must.have.property('pts')
        joueur.pts.must.equal(2.5)
    })
})

describe('Détermination des prochains affrontements pour une ronde suisse', () => {

    it('déterminer les affrontements d\'un groupe de 6 personnes', () => {
        let groupes = rondeSuisse.determineAffrontements([
            { name: 'j1', pts: 1,  }
        ])
        joueur.must.have.property('pts')
        joueur.pts.must.equal(3)
    })
})