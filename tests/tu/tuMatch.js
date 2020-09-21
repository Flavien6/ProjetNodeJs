// lancement du test : mocha nomDuTest.js
// Inclusion de la librairie Must pour les tests Unitaires
let expect = require('must')
// Offre à n'importe quel élement la fonction must pour les tests
require('must/register')
// Inclusion de la fonction à tester
let match = require('../../app/backend/processus/match')

describe('Initialisation d\' une ronde suisse', () => {
    it('Groupe est différent d\'un tableau', () => {
        expect(() => { match.initialiser(0) }).to.throw()
        expect(() => { match.initialiser('') }).to.throw()
        expect(() => { match.initialiser(null) }).to.throw()
        expect(() => { match.initialiser(undefined) }).to.throw()
    })

    it('Groupe de 4 joueurs', () => {
        let groupes = match.initialiser(['j1', 'j2', 'j3', 'j4'])
        
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
        let groupes = match.initialiser(['j1', 'j2', 'j3', 'j4', 'j5'])
        
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
        let groupes = match.initialiser(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10'])
        
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
        expect(() => { match.calculPoints() }).to.throw()
    })

    it('Type inexistant', () => {
        expect(() => { match.calculPoints('a', {}) }).to.throw()
        expect(() => { match.calculPoints('', {}) }).to.throw()
        expect(() => { match.calculPoints(null, {}) }).to.throw()
        expect(() => { match.calculPoints(undefined, {}) }).to.throw()
    })

    it('Joueur invalide', () => {
        expect(() => { match.calculPoints('v', {}) }).to.throw()
        expect(() => { match.calculPoints('v', null) }).to.throw()
        expect(() => { match.calculPoints('v', undefined) }).to.throw()
    })

    it('Vainqueur', () => {
        let joueur = match.calculPoints('v', { name: 'j1', pts: 2 })
        joueur.must.have.property('pts')
        joueur.pts.must.equal(3)
    })

    it('Perdant', () => {
        let joueur = match.calculPoints('p', { name: 'j1', pts: 2 })
        joueur.must.have.property('pts')
        joueur.pts.must.equal(2)
    })

    it('Egalité', () => {
        let joueur = match.calculPoints('e', { name: 'j1', pts: 2 })
        joueur.must.have.property('pts')
        joueur.pts.must.equal(2.5)
    })
})

describe('Détermination d\'une couleur aléatoire entre b et n', () => {
    it('donne une couleur entre b et n', () => {
        let couleur = match.randCouleurs()
        couleur.must.match(/^[b,n]$/)
    })
})

describe('Détermination du nombre de ronde en fonction du nombre de participants', () => {

    it('Le nombre de participant est différent d\'un nombre', () => {
        expect(() => { match.initialiser() }).to.throw()
        expect(() => { match.initialiser('') }).to.throw()
        expect(() => { match.initialiser(null) }).to.throw()
        expect(() => { match.initialiser(undefined) }).to.throw()
    })

    it('Nombre de ronde pour 2 participants', () => {
        let nb = match.nombreRondes(2)
        nb.must.equal(1)
    })

    it('Nombre de ronde pour 4 participants', () => {
        let nb = match.nombreRondes(4)
        nb.must.equal(2)
    })

    it('Nombre de ronde pour 5 participants', () => {
        let nb = match.nombreRondes(5)
        nb.must.equal(3)
    })

    it('Nombre de ronde pour 10 participants', () => {
        let nb = match.nombreRondes(10)
        nb.must.equal(5)
    })
})

describe('Détermination des prochains affrontements pour une ronde suisse', () => {

    it('déterminer les affrontements d\'un groupe de 4 personnes', () => {
        let groupes = match.determineAffrontements([
            { name: 'j1', pts: 1, adversaires: ['j4'], couleurs : {n:1, b:0}},
            { name: 'j2', pts: 0, adversaires: ['j3'], couleurs : {n:0, b:1} },
            { name: 'j3', pts: 1, adversaires: ['j2'], couleurs : {n:1, b:0}},
            { name: 'j4', pts: 0, adversaires: ['j1'], couleurs : {n:0, b:1}}
        ])

        groupes.must.length(2)
        groupes[0].must.length(2)
        groupes[1].must.length(2)
    })
})