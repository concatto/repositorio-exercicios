describe("Deve carregar pagina", ()=>{
    beforeEach(() => {
        cy.visit('localhost:3000')
      })

      it('login invalido',()=>{
        cy.get('#loginUsuario').type('banana')
        cy.get('#loginSenha').type('123')
        cy.get("#loginEntrar").click()
        cy.get('.text-danger').should('be.visible')
      })

      it('login valido',()=>{
        cy.get('#loginUsuario').type('reap')
        cy.get('#loginSenha').type('123')
        cy.get("#loginEntrar").click()
        cy.contains('Boas vindas, REAP')
      })
    
})