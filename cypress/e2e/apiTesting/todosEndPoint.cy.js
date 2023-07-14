/// <reference types = "Cypress" />
import todos from '/cypress/support/pageObject/todosApi.js';
const token = Cypress.env('token')

describe('Get request of Todos endpoint ', () => {
    it("get all todos ", () => {
        const todosUsers = todos.getAllTodos()
        todosUsers.then((res) => {
            cy.log(res.body)
            expect(res.body).to.have.length(10)
            expect(res.status).eq(200)
        })
    })
    it("get Todos of specific ID", () => {
        const getUser = todos.getSingleTodos()
        getUser.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(200)
            expect(res.body.id).eq(20292)
            expect(res.body.user_id).eq(3630521)
        })
    })
    it("get todos by non-existent todos ID throw an error", () => {
        const invalidID = todos.invalidID()
        invalidID.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(404)
            expect(res.body).to.have.property("message", "Resource not found")
        })
    })
})
describe('POST requests of Todos endpoint ', () => {
    it("create new todos ", () => {
        const todosBody = {
            "user_id": 3630521,
            "title": "API testing",
            "due_on": "2023-07-14T12:12:12.000+05:30",
            "status": "completed"
        }
        const newTodos = todos.createNewTodo(todosBody)
        newTodos.then((res) => {
            cy.log(res.body)
            expect(res.status).eq(201)
            expect(res.body.title).eq('API testing')
            expect(res.body.due_on).eq("2023-07-14T12:12:12.000+05:30")
        })
    })
    it("verify new todo present in all todos", () => {
        const todosBody = {
            "user_id": 3630521,
            "title": "API testing",
            "due_on": "2023-07-14T12:12:12.000+05:30",
            "status": "completed"
        }
        const newTodos = todos.createNewTodo(todosBody)
        newTodos.then((res) => {
            const Id = res.body.id
            const gettodo = todos.getNewTodo(Id)
            gettodo.then((res) => {
                expect(res.status).eq(200)
                expect(res.body.title).eq('API testing')
            })
        })
    })
})
describe('Put request of Todos endpoint ', () => {
    it("Verify user update todos sucessfully ", () => {
        const todosBody = {
            "user_id": 3630521,
            "title": "API testing",
            "due_on": "2023-07-14T12:12:12.000+05:30",
            "status": "pending"
        }
        const newTodos = todos.createNewTodo(todosBody)
        newTodos.then((res) => {
            const Id = res.body.id
            const todosBody2 = {
                "title": "API updated testing",
                "due_on": "2023-12-14T12:12:12.000+05:30",
                "status": "completed"
            }
            const updateTodo = todos.updateTodo(Id, todosBody2)
            updateTodo.then((res) => {
                cy.log(res)
                expect(res.body.title).eq('API updated testing')
                expect(res.status).eq(200)
                expect(res.body.status).eq('completed')
            })
        })
    })
    it("Verify that a PUT request with invalid status return an error ", () => {
        const todosBody = {
            "user_id": 3630521,
            "title": "API testing",
            "due_on": "2023-07-14T12:12:12.000+05:30",
            "status": "pending"
        }
        const newTodos = todos.createNewTodo(todosBody)
        newTodos.then((res) => {
            const Id = res.body.id
            const todosBody2 = {
                "status": "incomplete"
            }
            const updateTodo = todos.updateTodo(Id, todosBody2)
            updateTodo.then((res) => {
                cy.log(res)
                expect(res.status).eq(422)
                expect(res.body[0].field).to.eq('status');
                expect(res.body[0].message).to.eq("can't be blank, can be pending or completed");
            })
        })
    })
})
describe('DELTE request of todos endpoint', () => {
    it("delete an existing todo by Id ", () => {
        const todosBody = {
            "user_id": 3630521,
            "title": "API testing",
            "due_on": "2023-07-14T12:12:12.000+05:30",
            "status": "pending"
        }
        const newTodos = todos.createNewTodo(todosBody)
        newTodos.then((res) => {
            const Id = res.body.id
            const delTodo = todos.deleteTodo(Id)
            delTodo.then((res) => {
                cy.log(res)
                expect(res.status).eq(204)
                expect(res.body).to.be.empty;
                expect(res.body).eq("")
            })
        })
    })
    it("delete an existing post by invalid id ", () => {
        const todosBody = {
            "user_id": 3630521,
            "title": "API testing",
            "due_on": "2023-07-14T12:12:12.000+05:30",
            "status": "pending"
        }
        const newTodos = todos.createNewTodo(todosBody)
        newTodos.then((res) => {
            const Id = res.body.id + 2
            const delTodo = todos.deleteTodo(Id)
            delTodo.then((res) => {
                cy.log(res)
                expect(res.status).eq(404)
                expect(res.body).to.have.property('message', "Resource not found")
            })
        })
    })
})
