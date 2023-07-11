/// <reference types = "Cypress" />
import user from '/cypress/support/pageObject/pom.js';

describe('create new user (post) and call through id (get)', () => {

    it('create new user and get through ID', () => {
        let access_token = '89c07163b5071631e58aa5ef2f9ff924493b40d7c85dc49c43cb6b352b3f8fc5'
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            body: {
                "name": "cypress",
                "gender": "male",
                "email": user.generateRandomEmail(),
                "status": "active"
            },
        }).then((response) => {
            expect(response.status).to.equal(201);
            cy.log(JSON.stringify(response))
            expect(response.body.name).eql('cypress');
            const userID = response.body.id;
            cy.log("user id is: " + userID);

            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + userID,
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
            }).then((getResponse) => {
                expect(getResponse.status).to.equal(200)
                expect(getResponse.body.id).to.eq(userID)
                expect(getResponse.body.name).eql('cypress');

            });
        });
    });
})