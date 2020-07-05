// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add('requestGrantCode', () => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrlSensedia')+'/oauth/grant-code',
        header: {
            'content-type': 'application/json'
        },
        body: {
            client_id: Cypress.env('client_id'),
            redirect_uri: 'https://www.bancorcibrasil.com'
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        var data = JSON.parse(JSON.stringify(response.body));
        var regex = new RegExp("(code\=)(.*)");
        Cypress.env("code", regex.exec(data.redirect_uri)[2]);
    })
})

Cypress.Commands.add('requestAccessToken', () => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrlSensedia')+'/oauth/access-token',
        header: {
            'content-type': 'application/json',
        },
        auth: {
            username: Cypress.env('client_id'),
            password: Cypress.env('client_secret')
        },
        body: {
            grant_type: 'authorization_code',
            code: Cypress.env("code")
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        var data = JSON.parse(JSON.stringify(response.body));
        Cypress.env("access_token", data.access_token)
    })
})