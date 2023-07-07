const url = Cypress.env('baseUrl')
const token = Cypress.env('token')

export class User{
    getAllUser(){
        return new Cypress.Promise((resolve, reject)=>{
            cy.request({
                method : 'GET',
                url : url+'/users',
                headers:{
                    'Authorization' : token 
                },
            }).then((response)=>{
             resolve(response)
            })
        })
        }
        getOneUser(id){
            return new Cypress.Promise((resolve, reject)=>{
                cy.request({
                    method : 'GET',
                    url : url+'/users/'+id,
                    headers:{
                        'Authorization' : token 
                    },
                }).then((response)=>{
                 resolve(response)
                })
            })
            }
    createNewUser(body){
        return new Cypress.Promise((resolve,reject)=>{
            cy.request({
                method : 'POST',
                url : url+'/users',
                failOnStatusCode: false,
                headers:{
                    'Authorization' : token 
                },
                body:{
                    body
                  }
            }).then((response)=>{
                resolve(response)
                 })
        })
    }
}