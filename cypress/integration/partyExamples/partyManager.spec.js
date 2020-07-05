/// <reference types="cypress"/>

describe('Party Members', () => {
    before('Generate Token', () => {
        cy.requestGrantCode();
        cy.requestAccessToken();
    })

    it('List party Member ', () => {
        var offset = 0;
        var limit = 10;
        cy.request({
            method: 'GET',
            url: Cypress.env('baseUrlSensedia')+'/sandbox'+'/party-manager/v1/party-members?_offset='+offset+'&_limit='+limit
        }).then((response) => {
            expect(response.status).to.eq(206);
            var maximumDataLimitResponse = 100;
            if(expect(response.body).to.not.be.null){
                var data = (response.body)
                var countDataArray = data.length;;
                expect(data[0]).to.have.property('partyMemberId');
                expect(data[0]).to.have.property('cpfCnpj');
                expect(data[0]).to.have.property('name');
                expect(data[0]).to.have.property('nickname');
                expect(data[0]).to.have.property('type');
            }
            if (limit > maximumDataLimitResponse){
                throw new Error("VERIFICAR: O Limite maximo é "+maximumDataLimitResponse+" registros por pagina!!!");
            }
            if (countDataArray > limit){
                throw new Error("VERIFICAR: A contagem dos indices do Array é maior que o limit informado!!!");
            }

            var headers = response.headers;
            if(expect(headers.link).to.not.be.null){
                var Link = headers.link;
                expect(headers).to.have.property('content-range');
                expect(headers).to.have.property('accept-range');
                //expect(Link).to.contain("self");
                expect(Link).to.contain("next");
                //expect(Link).to.contain("prev");
                //expect(Link).to.contain("first");
                expect(Link).to.contain("last");
            }
        })
    })

})