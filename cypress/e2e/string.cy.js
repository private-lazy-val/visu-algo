import {
    appUrl,
    testInputValueSelector,
    testSubmitButtonSelector,
    testCircleSelector
} from "../../src/constants/constants";
import '@testing-library/cypress/add-commands';
import {DELAY_IN_MS} from "../../src/constants/delays";
describe('string', function() {
    beforeEach(function () {
        cy.visit(`${appUrl}/recursion`);
    });

    it('`reverse` button should be disabled if input is empty', function () {
        cy.get(testInputValueSelector).should("be.empty");
        cy.get(testSubmitButtonSelector).should('be.disabled');
    });

    const inputString = 'hello';
    const inputStringColorsArr = [
        "rgb(210, 82, 225)",
        "rgb(0, 50, 255)",
        "rgb(0, 50, 255)",
        "rgb(0, 50, 255)",
        "rgb(210, 82, 225)",
    ];

    const inProgressString = "oellh";
    const inProgressStringColorsArr = [
        "rgb(127, 224, 81)",
        "rgb(210, 82, 225)",
        "rgb(0, 50, 255)",
        "rgb(210, 82, 225)",
        "rgb(127, 224, 81)",
    ];
    const reversedString = 'olleh';
    const reversedStringColorsArr = [
        "rgb(127, 224, 81)",
        "rgb(127, 224, 81)",
        "rgb(127, 224, 81)",
        "rgb(127, 224, 81)",
        "rgb(127, 224, 81)",
    ];

    it('string should reverse correctly', function () {
        cy.get(testInputValueSelector).type(inputString);
        cy.get(testSubmitButtonSelector).should("not.be.disabled");
        cy.get(testSubmitButtonSelector).click();
        cy.get(testSubmitButtonSelector).should("be.disabled");

        cy.get(testCircleSelector).each(($el, index) => {
            cy.get($el).should("have.css", "border-color", inputStringColorsArr[index]);
            cy.get($el).contains(inputString[index]);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).each(($el, index) => {
            cy.get($el).should("have.css", "border-color", inProgressStringColorsArr[index]);
            cy.get($el).contains(inProgressString[index]);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).each(($el, index) => {
            cy.get($el).should("have.css", "border-color", reversedStringColorsArr[index]);
            cy.get($el).contains(reversedString[index]);
        });
    });
});