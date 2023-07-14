/// <reference types = "Cypress" />
import posts from '/cypress/support/pageObject/postsApi.js';
import user from '/cypress/support/pageObject/userApi.js';

describe('GET request of posts endpoint ', () => {
    it("get all posts ", () => {
        const postsUsers = posts.getAllPostsUsers()
        postsUsers.then((res) => {
            cy.log(res.body)
            expect(res.body).to.have.length(10)
            expect(res.status).eq(200)
        })
    })
    it("get post of specific ID", () => {
        const getUser = posts.getSinglePost()
        getUser.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(200)
            expect(res.body.id).eq(51273)
            expect(res.body.user_id).eq(3630556)
        })
    })
    it("get request with an non-existent post ID ", () => {
        const invalidID = posts.invalidID()
        invalidID.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(404)
            expect(res.body).to.have.property("message", "Resource not found")
        })
    })
    it("get request without Authetication ", () => {
        const withoutAuthetication = posts.withoutAuthetication()
        withoutAuthetication.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(404)
            expect(res.body).to.have.property("message", "Resource not found")
        })
    })
})
describe('POST request of posts endpoint ', () => {
    it("create new post ", () => {
        const newUser = {
            "name": "cypressApi",
            "gender": "male",
            "email": user.generateRandomEmail(),
            "status": "active"
        };
        const new_User = user.createNewUser(newUser)
        new_User.then((response) => {
            const User_ID = response.body.id
            const postBody = {
                title: 'Testing',
                body: "This is my post content",
                user_id: User_ID,
            }
            const newPost = posts.createNewPost(postBody)
            newPost.then((res) => {
                cy.log(res.body)
                expect(res.status).eq(201)
                expect(res.body.title).eq('Testing')
                expect(res.body.body).eq('This is my post content')
                expect(res.body.user_id).eq(User_ID)
            })
        })
    })
    it("verify new post request present in all post", () => {
        const postBody = {
            title: 'Testing',
            body: "This is my post content",
            user_id: 3630556,
        }
        const newPost = posts.createNewPost(postBody)
        newPost.then((res) => {
            const postId = res.body.id;
            const post = posts.getNewePost(postId)
            post.then((res) => {
                expect(res.status).eq(200)
                expect(res.body.title).eq('Testing')
                expect(res.body.body).eq('This is my post content')
            })
        })
    })
})
describe('PUT request of posts endpoint ', () => {
    it("Verify user update post sucessfully ", () => {
        const postBody = {
            title: 'Testing',
            body: "This is my post content",
            user_id: 3630556,
        }
        const newPost = posts.createNewPost(postBody)
        newPost.then((res) => {
            const postID = res.body.id
            const postBody1 = {
                title: 'Testing123',
                body: "This is put content",
            }
            const updatePost = posts.updatePost(postID, postBody1)
            updatePost.then((res) => {
                cy.log(res)
                expect(res.body.title).eq('Testing123')
                expect(res.body.body).eq('This is put content')
            })
        })
    })
    it("Verify that a Post request without providing the title field return an error ", () => {
        const postBody = {
            //title: 'Testing',
            body: "This is my post content",
            user_id: 3630556,
        }
        const newPost = posts.createNewPost(postBody)
        newPost.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(422)
            expect(res.body[0]).to.have.property("field", "title")
            expect(res.body[0]).to.have.property("message", "can't be blank")
        })
    })
})
describe('DELETE request of posts endpoint ', () => {
    it("delete an existing post by Id ", () => {
        const postBody = {
            title: 'Testing',
            body: "This is my post content",
            user_id: 3630556,
        }
        const newPost = posts.createNewPost(postBody)
        newPost.then((res) => {
            const postID = res.body.id
            const delPost = posts.deletePost(postID)
            delPost.then((res) => {
                cy.log(res)
                expect(res.status).eq(204)
                expect(res.body).to.be.empty;
                expect(res.body).eq("")
            })
        })
    })
    it("delete an existing post by invalid id ", () => {
        const postBody = {
            title: 'Testing',
            body: "This is my post content",
            user_id: 3630556,
        }
        const newPost = posts.createNewPost(postBody)
        newPost.then((res) => {
            const postID = res.body.id
            const delPost = posts.invalidIdDeletePost(postID)
            delPost.then((res) => {
                cy.log(res)
                expect(res.status).eq(404)
                expect(res.body).to.have.property("message", "Resource not found")
            })
        })
    })
})

