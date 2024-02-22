import {
    appUrl,
    testCircleSelector,
    testInputValueSelector,
    testSubmitButtonSelector
} from "../../src/constants/constants";
import '@testing-library/cypress/add-commands';
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
describe('fibonacci', function() {
    beforeEach(function () {
        cy.visit(`${appUrl}/fibonacci`);
    });

    it('`calculate` button should be disabled if input is empty', function () {
        cy.get(testInputValueSelector).should("be.empty");
        cy.get(testSubmitButtonSelector).should('be.disabled');
    });

    const fibonacciNum = '6';
    const fibonacciArr = [1, 1, 2, 3, 5, 8, 13];
    const color = 'rgb(0, 50, 255)';

    // Function to check the Fibonacci numbers and their color
    function checkFibonacciNumbersAndColor() {
        cy.get(testCircleSelector).each(($el, index) => {
            cy.get($el).contains(fibonacciArr[index]);
            cy.get($el).should("have.css", "border-color", color);
        });
    }

    it('numbers should be generated correctly', function () {
        cy.get(testInputValueSelector).type(fibonacciNum);
        cy.get(testSubmitButtonSelector).should("not.be.disabled");
        cy.get(testSubmitButtonSelector).click();
        cy.get(testSubmitButtonSelector).should("be.disabled");

        checkFibonacciNumbersAndColor();
        cy.wait(SHORT_DELAY_IN_MS);
        checkFibonacciNumbersAndColor();
        cy.wait(SHORT_DELAY_IN_MS);
        checkFibonacciNumbersAndColor();
        cy.wait(SHORT_DELAY_IN_MS);
        checkFibonacciNumbersAndColor();
        cy.wait(SHORT_DELAY_IN_MS);
        checkFibonacciNumbersAndColor();
        cy.wait(SHORT_DELAY_IN_MS);
        checkFibonacciNumbersAndColor();
    });
});