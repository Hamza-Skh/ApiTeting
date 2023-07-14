const baseUrl = Cypress.env('Url')
const token = Cypress.env('token')

class comments {
    getAllComments() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'comments',
        })
    }
    getSingleComment() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'comments/45465',
            headers: {
                'Authorization': token
            },
        })
    }
    invalidID() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'comments/521',
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false
        })

    }
    createNewComment(body) {
        return cy.request({
            method: 'POST',
            url: baseUrl + 'comments',
            headers: {
                'Authorization': token
            },
            body: body,
            failOnStatusCode: false
        }
        )
    }
    getNewComment(ID) {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'comments/' + ID,
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false

        })
    }
    updateComments(UserID, body) {
        return cy.request({
            method: 'PUT',
            url: baseUrl + 'comments/' + UserID,
            headers: {
                'Authorization': token
            },
            body: body,
            failOnStatusCode: false

        })
    }
    deleteComents(ID) {
        return cy.request({
            method: 'DELETE',
            url: baseUrl + 'comments/' + ID,
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false
        })
    }
    invalidIdDeletePost(postID) {
        return cy.request({
            method: 'DELETE',
            url: baseUrl + 'posts/' + postID + 2,
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false
        })
    }
}

export default new comments