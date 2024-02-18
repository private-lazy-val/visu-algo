import {appUrl} from "../../src/constants/constants";

describe('app is up', function() {
    it('app should be available on localhost:3001', function() {
        cy.visit(appUrl);
        cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
    });
});