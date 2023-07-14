const baseUrl = Cypress.env('Url')
const token = Cypress.env('token')

class posts {
    getAllPostsUsers() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'posts',
        })
    }
    getSinglePost() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'posts/51273',
            headers: {
                'Authorization': token
            },

        })

    }
    invalidID() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'posts/521',
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false

        })

    }
    withoutAuthetication() {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'posts/51273',
            failOnStatusCode: false

        })

    }
    createNewPost(body) {
        return cy.request({
            method: 'POST',
            url: baseUrl + 'posts',
            headers: {
                'Authorization': token
            },
            body: body,
            failOnStatusCode: false
        }
        )
    }
    getNewePost(UserID) {
        return cy.request({
            method: 'GET',
            url: baseUrl + 'posts/' + UserID,
            headers: {
                'Authorization': token
            },
            failOnStatusCode: false

        })
    }
    updatePost(UserID, body) {
        return cy.request({
            method: 'PUT',
            url: baseUrl + 'posts/' + UserID,
            headers: {
                'Authorization': token
            },
            body: body,
            failOnStatusCode: false

        })
    }
    deletePost(postID) {
        return cy.request({
            method: 'DELETE',
            url: baseUrl + 'posts/' + postID,
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

export default new posts