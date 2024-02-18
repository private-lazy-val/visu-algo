import {appUrl} from "../../src/constants/constants";

describe('app works correctly with routes', function() {
    before(function () {
        cy.visit(appUrl);
    });

    it('should open main page by default', function() {
        cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
    });

    it("should open string-page by link", function () {
        cy.visit(`${appUrl}/recursion`);
        cy.get('h3').contains('Строка');
    });

    it("should open fibonacci-page by link", function () {
        cy.visit(`${appUrl}/fibonacci`);
        cy.get('h3').contains('Последовательность Фибоначчи');
    });

    it("should open sorting-page by link", function () {
        cy.visit(`${appUrl}/sorting`);
        cy.get('h3').contains('Сортировка массива');
    });

    it("should open stack-page by link", function () {
        cy.visit(`${appUrl}/stack`);
        cy.get('h3').contains('Стек');
    });

    it("should open queue-page by link", function () {
        cy.visit(`${appUrl}/queue`);
        cy.get('h3').contains('Очередь');
    });

    it("should open list-page by link", function () {
        cy.visit(`${appUrl}/list`);
        cy.get('h3').contains('Связный список');
    });
});