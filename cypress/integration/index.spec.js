describe('Quizz App', () => {
  it('Visits the url http://localhost:3000 and waits for api call', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/v1/graphql',
      },
    ).as('api')

    cy.visit('http://localhost:3000')
    cy.wait('@api')
  })

  it('Is showing quizzes correctly', () => {
    cy.get('.js_card__quizz h2').should(($div) => {
      expect($div.get(0).innerText).not.to.eq('...')
    })
  })
})