/// <reference types = "Cypress" />
//import user from '../support/pageObject/pom.js';
import user from '/cypress/support/pageObject/pom.js';
import '/cypress/support/userCommonFunc.js';

describe('API Testing - user ', () => {
    it('get all the user', () => {
        user.getAllUser().then((res) => {
            cy.log(res.body)
            console.log(res.body)
            cy.log(JSON.stringify(res))
            expect(res.status).eq(200)
            expect(res.body).have.length(10)
        })
    })
});