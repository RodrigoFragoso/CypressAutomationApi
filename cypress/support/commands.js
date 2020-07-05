// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    const optionsObject = options[0];
    if (optionsObject === Object(optionsObject)) {
        optionsObject.headers = {
            'content-type': 'application/json',
            'access_token': Cypress.env("access_token"),
            'client_id': Cypress.env("client_id"),
            'channel_name': Cypress.env("channel_name")
        };
      return originalFn(optionsObject);
    }
    return originalFn(...options);
  });