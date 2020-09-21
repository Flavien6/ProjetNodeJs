// <reference types="cypress" />

context('Joueurs', () => {
  
    it('Création d\'un joueur', () => {
        cy.visit('http://127.0.0.1:3000/')

        cy.findByText('Login').parent('div').children('input').type('admin@admin.fr')
        cy.findByText('Mot de passe').parent('div').children('input').type('Admin123')
        cy.findByText('Envoyer').should('be.visible').type('{enter}')

        cy.findByText('Joueurs').should('be.visible').type('{enter}')
        cy.findByText('Ajouter').should('be.visible').type('{enter}')

        cy.findByText('Nom').parent('div').children('input').type('Nom test')
        cy.findByText('Prenom').parent('div').children('input').type('Prenom test')
        cy.findByText('Date de naissance').parent('div').children('input').type('1995-08-05')
        cy.findByText('Mail').parent('div').children('input').type('mail@example.com')
        
        cy.findByText('Envoyer').should('be.visible').type('{enter}')

        cy.contains('Nom test').should('be.visible')
    })

    it('Modification d\'un joueur', () => {
        cy.visit('http://127.0.0.1:3000/')

        cy.findByText('Login').parent('div').children('input').type('admin@admin.fr')
        cy.findByText('Mot de passe').parent('div').children('input').type('Admin123')
        cy.findByText('Envoyer').should('be.visible').type('{enter}')

        cy.findByText('Joueurs').should('be.visible').type('{enter}')

        cy.contains('Nom test').should('be.visible').parents('li').children().contains('Modifier').should('be.visible').type('{enter}')
        cy.findByText('Nom').parent('div').children('input').clear()
        cy.findByText('Nom').parent('div').children('input').type('Nom new test')
        cy.findByText('Envoyer').should('be.visible').type('{enter}')
        cy.contains('Nom new test').should('be.visible')
    }) 

    it('Suppréssion d\'un joueur', () => {
        cy.visit('http://127.0.0.1:3000/')

        cy.findByText('Login').parent('div').children('input').type('admin@admin.fr')
        cy.findByText('Mot de passe').parent('div').children('input').type('Admin123')
        cy.findByText('Envoyer').should('be.visible').type('{enter}')

        cy.findByText('Joueurs').should('be.visible').type('{enter}')
        
        cy.contains('Nom new test').should('be.visible').parents('li').children().contains('Supprimer').should('be.visible').type('{enter}')
        cy.findByText('Oui').should('be.visible').type('{enter}')
        cy.contains('Nom new test').should('not.be.visible')
    }) 
})