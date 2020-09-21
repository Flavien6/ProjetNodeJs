// <reference types="cypress" />

context('Tournois', () => {
  
    it('Création d\'un tournoi', () => {
        cy.visit('http://127.0.0.1:3000/')

        cy.findByText('Tournois').should('be.visible').type('{enter}')
        cy.findByText('Ajouter').should('be.visible').type('{enter}')

        cy.findByText('Nom').parent('div').children('input').type('Nom test')
        cy.findByText('Date').parent('div').children('input').type('2020-09-21')
        cy.findByText('Système').parent('div').children('select').select('Elimination directe')
        
        cy.findByText('Envoyer').should('be.visible').type('{enter}')

        cy.contains('Nom test').should('be.visible')
    })

    it('Modification d\'un tournoi', () => {
        cy.visit('http://127.0.0.1:3000/tournois')
        cy.contains('Nom test').should('be.visible').parents('li').children().contains('Modifier').should('be.visible').type('{enter}')
        cy.findByText('Nom').parent('div').children('input').clear()
        cy.findByText('Nom').parent('div').children('input').type('Nom new test')
        cy.findByText('Envoyer').should('be.visible').type('{enter}')
        cy.contains('Nom new test').should('be.visible')
    }) 

    it('Suppréssion d\'un tournoi', () => {
        cy.visit('http://127.0.0.1:3000/tournois')

        cy.contains('Nom new test').should('be.visible').parents('li').children().contains('Supprimer').should('be.visible').type('{enter}')
        cy.findByText('Oui').should('be.visible').type('{enter}')
        cy.contains('Nom new test').should('not.be.visible')
    })
})