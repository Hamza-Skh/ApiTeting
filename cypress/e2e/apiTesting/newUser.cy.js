/// <reference types = "Cypress" />
const dataJSON = require('../../fixtures/createUser')

describe('create new user ', () => {

it('Create a new user 1', () => {
    let userData = {
        "name": "cypress",
        "gender": "male",
        "email": "cyprs22@gmail.com",
        "status": "active"
    }
    let access_token = '89c07163b5071631e58aa5ef2f9ff924493b40d7c85dc49c43cb6b352b3f8fc5'
    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Authorization' : 'Bearer ' + access_token
      },
      body: userData,
    }).then((response) => {
      expect(response.status).to.equal(201);
      cy.log(JSON.stringify(response))
      expect(response.body).has.property('email', userData.email)
      expect(response.body).to.have.property('name', userData.name);
    });
  });
  it('Create a new user 2', () => {
    let userData = {
        "name": dataJSON.name,
        "gender": dataJSON.gender,
        "email": dataJSON.email,
        "status": dataJSON.status
    }
    let access_token = '89c07163b5071631e58aa5ef2f9ff924493b40d7c85dc49c43cb6b352b3f8fc5'
    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Authorization' : 'Bearer ' + access_token
      },
      body: userData,
    }).then((response) => {
      expect(response.status).to.equal(201);
      //cy.log(JSON.stringify(response))
      expect(response.body).has.property('email', userData.email)
      expect(response.body).to.have.property('name', userData.name);
    });
  });
  it('Create a new user 3', () => {
    let userData = {
        "name": "cypress",
        "gender": "male",
        "email": "cynes@gmail.com",
        "status": "active"
    }
    let access_token = '89c07163b5071631e58aa5ef2f9ff924493b40d7c85dc49c43cb6b352b3f8fc5'
    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Authorization' : 'Bearer ' + access_token
      },
      body: userData,
    }).then((response) => {
      expect(response.status).to.equal(201);
      cy.log(response)
      //cy.log(JSON.stringify(response))
      expect(response.body.email).eql('cynes@gmail.com')
      expect(response.body.name).eql('cypress');
    });
  });
  it.only('Create a new user 4', () => {
    cy.fixture("createUser").then((data) =>{

    let access_token = '89c07163b5071631e58aa5ef2f9ff924493b40d7c85dc49c43cb6b352b3f8fc5'
    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Authorization' : 'Bearer ' + access_token
      },
      body: {
        "name": data.name,
        "gender": data.gender,
        "email": data.email,
        "status": data.status
    }
    }).then((response) => {
      expect(response.status).to.equal(201);
      cy.log(response)
      //cy.log(JSON.stringify(response))
      expect(response.body.email).eql(data.email)
      expect(response.body.name).eql(data.name);
    });
  });
})
});