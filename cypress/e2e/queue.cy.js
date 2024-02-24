import {
    appUrl,
    testCircleSelector,
    testHeadCircleSelector, testIndexSelector,
    testInputValueSelector,
    testSubmitButtonSelector,
    testDeleteButtonSelector, testResetButtonSelector, testTailCircleSelector
} from "../../src/constants/constants";
import '@testing-library/cypress/add-commands';
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('queue', function () {
    beforeEach(function () {
        cy.visit(`${appUrl}/queue`);
    });

    it('`add` button should be disabled if input is empty', function () {
        cy.get(testInputValueSelector).should("be.empty");
        cy.get(testSubmitButtonSelector).should('be.disabled');
    });

    const defaultColor = 'rgb(0, 50, 255)';
    const changingColor = 'rgb(210, 82, 225)';

    const firstElement = '1';
    const secondElement = '2';
    const thirdElement = '3';

    it('elements should be added correctly to the queue', function () {
        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testInputValueSelector).type(firstElement);
        cy.get(testSubmitButtonSelector).should("not.be.disabled");
        cy.get(testSubmitButtonSelector).click();

        cy.get(testCircleSelector).eq(0).as('firstCircle');
        cy.get('@firstCircle').should("contain", firstElement);
        cy.get('@firstCircle').should("have.css", "border-color", changingColor);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@firstCircle').should("have.css", "border-color", defaultColor);

        cy.get(testHeadCircleSelector).eq(0).should("contain", "head");
        cy.get(testTailCircleSelector).eq(0).should("contain", "tail");

        cy.get(testIndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(testInputValueSelector).should("be.empty");
        cy.get(testInputValueSelector).type(secondElement);
        cy.get(testSubmitButtonSelector).click();

        cy.get(testCircleSelector).eq(1).as('secondCircle');
        cy.get('@firstCircle').should("contain", firstElement);
        cy.get('@secondCircle').should("contain", secondElement);
        cy.get('@firstCircle').should("have.css", "border-color", defaultColor);
        cy.get('@secondCircle').should("have.css", "border-color", changingColor);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@secondCircle').should("have.css", "border-color", defaultColor);

        cy.get(testHeadCircleSelector).eq(0).should("contain", "head");
        cy.get(testHeadCircleSelector).eq(1).should("contain", "");
        cy.get(testTailCircleSelector).eq(0).should("contain", "");
        cy.get(testTailCircleSelector).eq(1).should("contain", "tail");

        cy.get(testIndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(testInputValueSelector).should("be.empty");
        cy.get(testInputValueSelector).type(thirdElement);
        cy.get(testSubmitButtonSelector).click();

        cy.get(testCircleSelector).eq(2).as('thirdCircle');
        cy.get('@firstCircle').should("contain", firstElement);
        cy.get('@secondCircle').should("contain", secondElement);
        cy.get('@thirdCircle').should("contain", thirdElement);
        cy.get('@firstCircle').should("have.css", "border-color", defaultColor);
        cy.get('@secondCircle').should("have.css", "border-color", defaultColor);
        cy.get('@thirdCircle').should("have.css", "border-color", changingColor);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@thirdCircle').should("have.css", "border-color", defaultColor);

        cy.get(testHeadCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "head");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
        });

        cy.get(testTailCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "tail");
        });

        cy.get(testIndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });
    });

    it('elements should be deleted correctly from the queue', function () {
        cy.get(testDeleteButtonSelector).should("be.disabled");
        cy.get(testInputValueSelector).type(firstElement);
        cy.get(testSubmitButtonSelector).click();
        cy.get(testInputValueSelector).type(secondElement);
        cy.get(testSubmitButtonSelector).click();
        cy.get(testInputValueSelector).type(thirdElement);
        cy.get(testSubmitButtonSelector).click();

        cy.get(testDeleteButtonSelector).should("not.be.disabled");
        cy.get(testDeleteButtonSelector).click();

        cy.get(testCircleSelector).eq(0).as('firstCircle');
        cy.get('@firstCircle').should("have.css", "border-color", changingColor);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(testCircleSelector).eq(0).should("contain", "");
        cy.get(testCircleSelector).eq(1).should("contain", secondElement);
        cy.get(testCircleSelector).eq(2).should("contain", thirdElement);
        cy.get(testCircleSelector).each(($el) => {
            cy.wrap($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "head");
            cy.get($list.eq(2)).should("contain", "");
        });

        cy.get(testTailCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "tail");
        });

        cy.get(testIndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(testDeleteButtonSelector).should("not.be.disabled");
        cy.get(testDeleteButtonSelector).click();

        cy.get(testCircleSelector).eq(1).as('secondCircle');
        cy.get('@secondCircle').should("have.css", "border-color", changingColor);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(testCircleSelector).eq(0).should("contain", "");
        cy.get(testCircleSelector).eq(1).should("contain", "");
        cy.get(testCircleSelector).eq(2).should("contain", thirdElement);
        cy.get(testCircleSelector).each(($el) => {
            cy.wrap($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "head");
        });

        cy.get(testTailCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "tail");
        });

        cy.get(testIndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(testDeleteButtonSelector).should("not.be.disabled");
        cy.get(testDeleteButtonSelector).click();

        cy.get(testCircleSelector).eq(2).as('thirdCircle');
        cy.get('@thirdCircle').should("have.css", "border-color", changingColor);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(testCircleSelector).each(($el) => {
            expect($el).to.contain("");
            cy.wrap($el).should("have.css", "border-color", defaultColor);
        });
        cy.get(testHeadCircleSelector).each(($el) => {
            expect($el).to.contain("");
        });
        cy.get(testTailCircleSelector).each(($el) => {
            expect($el).to.contain("");
        });
        cy.get(testIndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });
    });

    it('`reset` button should clear the queue', function () {
        cy.get(testCircleSelector).should('have.length', 7);
        cy.get(testResetButtonSelector).should("be.disabled");
        cy.get(testInputValueSelector).type(firstElement);
        cy.get(testSubmitButtonSelector).click();
        cy.get(testInputValueSelector).type(secondElement);
        cy.get(testSubmitButtonSelector).click();
        cy.get(testInputValueSelector).type(thirdElement);
        cy.get(testSubmitButtonSelector).click();

        cy.get(testResetButtonSelector).should("not.be.disabled");
        cy.get(testResetButtonSelector).click();

        cy.get(testCircleSelector).should('have.length', 7);
        cy.get(testCircleSelector).each(($el) => {
            expect($el).to.contain("");
        });
        cy.get(testIndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });
        cy.get(testResetButtonSelector).should("be.disabled");
    });
});