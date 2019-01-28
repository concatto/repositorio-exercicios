/// <reference types="Cypress" />

describe("Deve carregar pagina", ()=>{
    it('inicializou pagina',()=>{
      cy.visit('localhost:3000')
    })
   
})