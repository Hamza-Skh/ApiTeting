/// <reference types = "Cypress" />
import user from '/cypress/support/pageObject/userApi.js';

describe('users endpoint API testing ', () => {
  it('get all the user', () => {
    const GetAllUser = user.getAllUser()
    GetAllUser.then((res) => {
      cy.log(res.body)
      expect(res.status).eq(200)
      expect(res.body).have.length(10)
    })
  })
  it('create new user', () => {
    const requestBody = {
      "name": "cypress",
      "gender": "male",
      "email": user.generateRandomEmail(),
      "status": "active"
    };
    const createUser = user.createNewUser(requestBody)
    createUser.then((response) => {
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
    const createUser = user.createNewUser(requestBody)
    createUser.then((response) => {
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
    const createUser = user.createNewUser(requestBody)
    createUser.then((response) => {
      expect(response.status).eq(422);
      expect(response.body[0].field).eq('name');
      expect(response.body[0]).to.have.property('message', "can't be blank");
    });
  });
  it('update an existing user', () => {
    const requestBody1 = {
      "name": "cypress",
      "gender": "male",
      "email": user.generateRandomEmail(),
      "status": "active"
    };
    const createUser = user.createNewUser(requestBody1)
    createUser.then((response) => {
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
      const updateUser = user.updateUser(userID, requestBody2)
      updateUser.then((response) => {
        expect(response.status).eq(200);
        expect(response.body.name).eq('sosos');
        expect(response.body.status).eq('inactive');
      })
    });
  });
  it('delete an existing user', () => {
    const requestBody = {
      "name": "cypress",
      "gender": "male",
      "email": user.generateRandomEmail(),
      "status": "active"
    };
    const createUser = user.createNewUser(requestBody)
    createUser.then((response) => {
      expect(response.status).eq(201);
      expect(response.body.name).eq('cypress');
      expect(response.body).to.have.property('status', 'active');
      const userID = response.body.id
      const delUser = user.DelUser(userID)
      delUser.then((response) => {
        expect(response.status).eq(204);
        expect(response.body).not.to.have.property('status', 'active');
      });
    });
  })
});