/// <reference types = "Cypress" />
import user from '/cypress/support/pageObject/pom.js';

describe('API Testing user ', () => {
    it('get all the user', async () => {
        const res = await user.getAllUser()
        cy.log(res.body)
        console.log(res.body)
        cy.log(JSON.stringify(res))
        expect(res.status).eq(200)
        expect(res.body).have.length(10)
    })
    it('create new user', () => {
        const requestBody = {
          "name": "cypress",
          "gender": "male",
          "email": user.generateRandomEmail(),
          "status": "active"
        };
        user.createNewUser(requestBody).then((response) => {
          expect(response.status).eq(201);
          expect(response.body.name).eq('cypress');
          expect(response.body).to.have.property('status', 'active');
        });
      });
      
      it('verify new user cannot be created without email', () => {
        const requestBody = {
          "name": "cypress",
          "gender": "male",
          "status": "active",
        };
        
        user.createNewUser(requestBody).then((response) => {
          expect(response.status).to.eq(422);
          expect(response.body[0].field).eq('email');
          expect(response.body[0]).to.have.property('message', "can't be blank");

        });
      });
      it('verify new user cannot be created without name', () => {
        const requestBody = {
          "gender": "male",
          "email": user.generateRandomEmail(),
          "status": "active"
        };
        user.createNewUser(requestBody).then((response) => {
          expect(response.status).eq(422);
          expect(response.body[0].field).eq('name');
          expect(response.body[0]).to.have.property('message', "can't be blank");
        });
      });
      it('update user', () => {
        const requestBody1 = {
          "name": "cypress",
          "gender": "male",
          "email": user.generateRandomEmail(),
          "status": "active"
        };
        user.createNewUser(requestBody1).then((response) => {
          expect(response.status).eq(201);
          expect(response.body.name).eq('cypress');
          expect(response.body).to.have.property('status', 'active');
          const userID = response.body.id

          const requestBody2 = {
            "name": "sosos",
            "gender": "male",
            "email": user.generateRandomEmail(),
            "status": "inactive"
          };
          user.updateUser(userID, requestBody2).then((response) => {
            expect(response.status).eq(200);
            expect(response.body.name).eq('sosos');
            expect(response.body.status).eq('inactive');
          })
        });
      });
      it('delete user', () => {
        const requestBody = {
          "name": "cypress",
          "gender": "male",
          "email": user.generateRandomEmail(),
          "status": "active"
        };
        user.createNewUser(requestBody).then((response) => {
          expect(response.status).eq(201);
          expect(response.body.name).eq('cypress');
          expect(response.body).to.have.property('status', 'active');
          const userID = response.body.id
          user.DelUser(userID).then((response) => {
            expect(response.status).eq(204);
            expect(response.body).not.to.have.property('status', 'active');

        }); 
        });
      })
});