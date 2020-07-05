/// <reference types="cypress"/>

describe('Permission', () => {
    before('Generate Token', () => {
        cy.requestGrantCode();
        cy.requestAccessToken();
    })

    it('Insert a Permission', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('baseUrlSensedia')+'/sandbox'+'/party-permission/v1/party-members/1/permissions',
            body: {
                partyMemberDealership: "partyMemberDealership",
                channelName: "channelName",
                groupId: "groupId",
                role: "role",
                expiryDate: "expiryDate"
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            var data = (response.headers.location);
            if(expect(response.headers.location).to.exist){
                var location = response.headers.location;
                var regex = new RegExp("(\/permissions\/)(.*)")
                Cypress.env("permissionId", regex.exec(location)[2]);
                cy.log(Cypress.env("permissionId"));
            }
        })
    })

    it('Remove a permission', () => {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('baseUrlSensedia')+'/sandbox'+'/party-permission/v1/party-members/1/permissions/'+Cypress.env("permissionId"),
        }).then((response) => {
            expect(response.status).to.eq(204);
        })
    })

    it.skip('404 - Remove a permission', () => {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('baseUrlSensedia')+'/sandbox'+'/party-permission/v1/party-members/1/permissionsError/'+Cypress.env("permissionId"),
        }).then((response) => {
            expect(response.status).to.eq(404);
        })
    })

})