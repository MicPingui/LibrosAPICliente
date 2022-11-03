describe('Libros', () => {
  it('can list, show, create, edit and delete books', () => {
    //list
    cy.visit('/').get('[data-cy=link-a-libros]').click();
    //create
    cy.get('[href="/libros/crear"]').click()
      .get('[data-cy=input-book-title-create]').type('Nuevo libro desde cypress')
      .get('[data-cy=btn-book-create]').click()
      .get('[data-cy=lista-libros]').contains('Nuevo libro desde cypress');
    //Ver libro
    cy.get('[data-cy^=link-ver-libro-]').last().click()
      .get('h1').should('contain.text','Nuevo libro desde cypress')
      .get('[href="/libros"]').click();
    //edit
    cy.get('[data-cy^=link-editar-libro-]').last().click()
      .get('[data-cy=input-book-title-editar]').clear().type('Libro editado desde cypress')
      .get('[data-cy=btn-book-editar]').click()
      .get('[data-cy=lista-libros]').contains('Libro editado desde cypress');
    //eliminar
    cy.get('[data-cy^=link-eliminar-libro-]').last().click()
    .get('[data-cy^=link-ver-libro-]').last()
    .should('not.contain.text','Libro editado desde cypress');
    
  })
})