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

    it('Salaire est une string', () => {
        expect(() => { CalculIrpp('') }).to.throw()
    })

    it('Salaire est un nombre négatif', () => {
        expect(() => { CalculIrpp(-1) }).to.throw()
    })

    it('Salaire de 0€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(0)
        irpp.must.equal(0)
    })

    it('Salaire de 10 064€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(10064)
        irpp.must.equal(0)
    })

    it('Salaire de 10 065€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(10065)
        irpp.must.equal(0)
    })

    it('Salaire de 10 074€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(10074)
        irpp.must.equal(0)
    })

    it('Salaire de 10 075€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(10075)
        irpp.must.equal(1)
    })

    it('Salaire de 11 000€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(11000)
        irpp.must.equal(102)
    })

    it('Salaire de 15 000€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(15000)
        irpp.must.equal(542)
    })

    it('Salaire de 20 000€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(20000)
        irpp.must.equal(1092)
    })

    it('Salaire de 25 000€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(25000)
        irpp.must.equal(1642)
    })

    it('Salaire de 25 659€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(25659)
        irpp.must.equal(1715)
    })

    it('Salaire de 25 660€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(25660)
        irpp.must.equal(1715)
    })

    it('Salaire de 25 663€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(25663)
        irpp.must.equal(1716)
    })

    it('Salaire de 30 000€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(30000)
        irpp.must.equal(3017)
    })

    it('Salaire de 35 000€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(35000)
        irpp.must.equal(4517)
    })

    it('Salaire de 70 000€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(70000)
        irpp.must.equal(15017)
    })

    it('Salaire de 73 369€', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(73369)
        irpp.must.equal(16028)
    })

    it('Salaire de 150 000', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(150000)
        irpp.must.equal(47446)
    })

    it('Salaire de 157 900', () => {
        // Récupération du résultat de la fonction testé
        let irpp = CalculIrpp(157900)
        irpp.must.equal(50688)
    })
})