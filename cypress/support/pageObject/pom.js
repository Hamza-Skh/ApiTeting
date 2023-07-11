const baseUrl = Cypress.env('Url')
const token = Cypress.env('token')

class user {
    baseurl() {
        return baseUrl
    }
    getAllUser() {
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: this.baseurl() + 'posts',
            }).then((res) => {
                resolve(res);
            });
        })
    }
    createNewUser(body) {

        return cy.request({
            method: 'POST',
            url: this.baseurl() + 'users',
            headers: {
                'Authorization': token
            },
            body: body,
            failOnStatusCode: false
        });
    }
    updateUser(userID, body) {

        return cy.request({
            method: 'PUT',
            url: this.baseurl() + 'users/' + userID,
            headers: {
                'Authorization': token
            },
            body: body,
        })
    }
    DelUser(userID) {

        return cy.request({
            method: 'DELETE',
            url: this.baseurl() + 'users/' + userID,
            headers: {
                'Authorization': token
            },
        })
    }
    generateRandomEmail() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randomString = Math.random().toString(36).substring(2, 8);
        const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
        const domain = 'example.com';

        const randomEmail = `${randomString}${randomChar}@${domain}`;

        return randomEmail;
    }
}
export default new user