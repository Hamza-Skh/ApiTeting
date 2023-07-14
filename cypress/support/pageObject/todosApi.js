const baseUrl = Cypress.env('Url')
const token = Cypress.env('token')

class todos {
    getAllTodos() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'todos',
        })
    }
    getSingleTodos() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'todos/20292',
        })
    }
    invalidID() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'todos/521',
            failOnStatusCode: false
        })

    }
    createNewTodo(body) {
        return cy.request({
            method: 'POST',
            url: baseUrl + 'todos',
            headers: {
                'Authorization': token
            },
            body: body,
            failOnStatusCode: false
        }
        )
    }
    getNewTodo(ID) {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'todos/' + ID,
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false

        })
    }
    updateTodo(ID, body) {
        return cy.request({
            method: 'PUT',
            url: baseUrl + 'todos/' + ID,
            headers: {
                'Authorization': token
            },
            body: body,
            failOnStatusCode: false

        })
    }
    deleteTodo(ID) {
        return cy.request({
            method: 'DELETE',
            url: baseUrl + 'todos/' + ID,
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false
        })
    }
}

export default new todos