/// <reference types="cypress"/>

describe('Request all APIs project Pet', () => {

    it('post', () => {
        cy.request({
            method: 'POST',
            url: '/pet',
            body: {
                "id": 0,
                "category": 
                    {
                        "id": 0, "name": "string"
                    }, 
                "name": "doggie", 
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('get', () => {

    })

    it('vazio', () => {

    })

})