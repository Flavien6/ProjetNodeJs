// lancement du test : mocha nomDuTest.js
// Inclusion de la librairie Must pour les tests Unitaires
let expect = require('must')
// Offre à n'importe quel élement la fonction must pour les tests
require('must/register')
// Inclusion de la fonction à tester
let CalculIrpp = require('../srv/com/srv')

describe('Calcul de l\'IRPP', () => {
    it('Salaire manquant', () => {
        expect(() => { CalculIrpp() }).to.throw()
    })

    it('Salaire de 0€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(0)
        irpp.must.equal(0)
    })
})