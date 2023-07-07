/// <reference types = "Cypress" />

describe('API Testing - user ', () => {
    it('get all the user', ()=>{
        cy.request({
            method : 'GET',
            url: 'https://gorest.co.in/public/v2/posts',
        }).then((res) => {
            cy.log(res.body)
            cy.log(JSON.stringify(res))
            expect(res.status).eq(200)
            expect(res.body).have.length(10)
        })
    })
});