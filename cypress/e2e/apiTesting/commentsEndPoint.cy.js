/// <reference types = "Cypress" />
import posts from '/cypress/support/pageObject/postsApi.js';
import user from '/cypress/support/pageObject/userApi.js';
import comments from '/cypress/support/pageObject/commentsApi.js';
const token = Cypress.env('token')

describe('comments get request ', () => {
    it("get all comments ", () => {
        const postsUsers = comments.getAllComments()
        postsUsers.then((res) => {
            cy.log(res.body)
            expect(res.body).to.have.length(10)
            expect(res.status).eq(200)
        })
    })
    it("get post of specific ID", () => {
        const getUser = comments.getSingleComment()
        getUser.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(200)
            expect(res.body.id).eq(45465)
            expect(res.body.post_id).eq(51253)
        })
    })
    it("get request with an non-existent comment ID ", () => {
        const invalidID = comments.invalidID()
        invalidID.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(404)
            expect(res.body).to.have.property("message", "Resource not found")
        })
    })
})
describe('comments post requests ', () => {
    it("create new comment ", () => {
        const commentsBody = {
            "Id": 45465,
            "post_id": 51106,
            "name": "Aaditya Bhat",
            "email": "aaditya_bhat@howell-larson.test",
            "body": "this is the comments body"
        }
        const newComment = comments.createNewComment(commentsBody)
        newComment.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(201)
            expect(res.body.body).eq('this is the comments body')
            expect(res.body.post_id).eq(51106)
        })
    })
    it("verify new post comment request present in all comments", () => {
        const commentsBody = {
            "Id": 45465,
            "post_id": 51106,
            "name": "cypress",
            "email": "testing@howell-larson.test",
            "body": "this is the comments body 2"
        }
        const newComment = comments.createNewComment(commentsBody)
        newComment.then((res) => {
            const Id = res.body.id
            const post = comments.getNewComment(Id)
            post.then((res) => {
                expect(res.status).eq(200)
                expect(res.body.body).eq('this is the comments body 2')
            })
        })
    })
})
describe('comments put request ', () => {
    it("Verify user update comment sucessfully ", () => {
        const commentsBody = {
            "Id": 45465,
            "post_id": 51106,
            "name": "cypress",
            "email": "testing@howell-larson.test",
            "body": "this is the comments body 2"
        }
        const newComment = comments.createNewComment(commentsBody)
        newComment.then((res) => {
            const Id = res.body.id
            const commentsBody1 = {
                "Id": 45465,
                "post_id": 51106,
                "name": "cypresstesting",
                "email": "testing21@howell-larson.test",
                "body": "this is the comments upated request"
            }
            const updateComments = comments.updateComments(Id, commentsBody1)
            updateComments.then((res) => {
                cy.log(res)
                expect(res.body.body).eq('this is the comments upated request')
                expect(res.body.name).eq('cypresstesting')
                expect(res.body.email).eq('testing21@howell-larson.test')

            })
        })
    })
    it("Verify that a PUT request without providing the name field return an error ", () => {
        const commentsBody = {
            "Id": 45465,
            "post_id": 51106,
            //"name":"cypress",
            "email": "testing@howell-larson.test",
            "body": "this is the comments body 2"
        }
        const newComment = comments.createNewComment(commentsBody)
        newComment.then((res) => {
            const Id = res.body.id
            const commentsBody1 = {
                "Id": 45465,
                "post_id": 51106,
                "name": "cypresstesting",
                "email": "testing21@howell-larson.test",
                "body": "this is the comments upated request"
            }
            const updateComments = comments.updateComments(Id, commentsBody1)
            updateComments.then((res) => {
                cy.log(res)
                expect(res.status).eq(404)
                expect(res.body).to.have.property('message', "Resource not found")
            })
        })
    })
})
describe('comments delete request ', () => {
    it("delete an existing comment by Id ", () => {
        const commentsBody = {
            "Id": 45465,
            "post_id": 51106,
            "name": "cypress",
            "email": "testing@howell-larson.test",
            "body": "this is the comments body 2"
        }
        const newComment = comments.createNewComment(commentsBody)
        newComment.then((res) => {
            const Id = res.body.id
            const delComment = comments.deleteComents(Id)
            delComment.then((res) => {
                cy.log(res)
                expect(res.status).eq(204)
                expect(res.body).to.be.empty;
                expect(res.body).eq("")
            })
        })
    })
    it("delete an existing post by invalid id ", () => {
        const commentsBody = {
            "Id": 45465,
            "post_id": 51106,
            "name": "cypress",
            "email": "testing@howell-larson.test",
            "body": "this is the comments body 2"
        }
        const newComment = comments.createNewComment(commentsBody)
        newComment.then((res) => {
            const Id = res.body.id + 2
            const delComment = comments.deleteComents(Id)
            delComment.then((res) => {
                cy.log(res)
                expect(res.status).eq(404)
                expect(res.body).to.have.property('message', "Resource not found")
            })
        })
    })
})
