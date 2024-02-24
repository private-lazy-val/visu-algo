import {
    appUrl,
    testCircleSelector,
    testHeadCircleSelector,
    testIndexSelector,
    testInputValueSelector,
    testTailCircleSelector,
    testAddByIndexButtonSelector,
    testRemoveByIndexButtonSelector,
    testAddToHeadButtonSelector,
    testAddToTailButtonSelector,
    testArrowSelector,
    testTopCircleSelector,
    testSmallCircleSelector,
    testBottomCircleSelector,
    testInputIndexSelector,
    testRemoveFromHeadButtonSelector,
    testRemoveFromTailButtonSelector
} from "../../src/constants/constants";
import '@testing-library/cypress/add-commands';
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('list', function () {
    beforeEach(function () {
        cy.visit(`${appUrl}/list`);
    });

    it('`addToHead`, `addToTail`, `addByIndex` and `removeByIndex` buttons should be disabled if input is empty',
        function () {
            cy.get(testInputValueSelector).should("be.empty");
            cy.get(testInputIndexSelector).should("be.empty");
            cy.get(testAddToHeadButtonSelector).should('be.disabled');
            cy.get(testAddToTailButtonSelector).should('be.disabled');
            cy.get(testAddByIndexButtonSelector).should('be.disabled');
            cy.get(testRemoveByIndexButtonSelector).should('be.disabled');

            cy.get(testRemoveFromHeadButtonSelector).should('not.be.disabled');
            cy.get(testRemoveFromTailButtonSelector).should('not.be.disabled');
        });

    const defaultColor = 'rgb(0, 50, 255)';
    const changingColor = 'rgb(210, 82, 225)';
    const modifiedColor = 'rgb(127, 224, 81)';

    const value = '10';
    const index = '2';

    it('render default list', function () {
        cy.get(testCircleSelector).should('have.length', 4);
        cy.get(testArrowSelector).should("have.length", 3);

        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
            cy.get($el).should('not.be.empty');
        });

        cy.get(testHeadCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("contain", "head");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "");
        });

        cy.get(testTailCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "tail");
        });

        cy.get(testIndexSelector).each(($el, index) => {
            cy.get($el).should("contain", index);
        });
    });

    it('element should be added to the head of the list', function () {
        cy.get(testInputValueSelector).type(value);
        cy.get(testAddToHeadButtonSelector).should('not.be.disabled');
        cy.get(testAddToHeadButtonSelector).click();

        cy.get(testTopCircleSelector).contains(value);
        cy.get(testTopCircleSelector)
            .find(testSmallCircleSelector)
            .should("have.css", "border-color", changingColor);

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).should('have.length', 5);
        cy.get(testArrowSelector).should("have.length", 4);

        cy.get(testCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($head, index, $list,) => {
            cy.get($list.eq(0)).should("contain", "head");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "");
            cy.get($list.eq(4)).should("contain", "");
        });

        cy.get(testTailCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "");
            cy.get($list.eq(4)).should("contain", "tail");
        });

        cy.get(testIndexSelector).each(($el, index) => {
            cy.get($el).should("contain", index);
        });
    });

    it('element should be added to the tail of the list', function () {
        cy.get(testInputValueSelector).type(value);
        cy.get(testAddToTailButtonSelector).should('not.be.disabled');
        cy.get(testAddToTailButtonSelector).click();

        cy.get(testTopCircleSelector).contains(value);
        cy.get(testTopCircleSelector)
            .find(testSmallCircleSelector)
            .should("have.css", "border-color", changingColor);

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).should('have.length', 5);
        cy.get(testArrowSelector).should("have.length", 4);

        cy.get(testCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", modifiedColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($head, index, $list,) => {
            cy.get($list.eq(0)).should("contain", "head");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "");
            cy.get($list.eq(4)).should("contain", "");
        });

        cy.get(testTailCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "");
            cy.get($list.eq(4)).should("contain", "tail");
        });

        cy.get(testIndexSelector).each(($el, index) => {
            cy.get($el).should("contain", index);
        });
    })

    it('element should be added to the list by index', function () {
        cy.get(testInputValueSelector).type(value);
        cy.get(testInputIndexSelector).type(index);
        cy.get(testAddByIndexButtonSelector).should('not.be.disabled');
        cy.get(testAddByIndexButtonSelector).click();

        cy.get(testTopCircleSelector).contains(value);
        cy.get(testTopCircleSelector)
            .find(testSmallCircleSelector)
            .should("have.css", "border-color", changingColor);

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).eq(0).should("have.css", "border-color", changingColor);

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).eq(1).should("have.css", "border-color", changingColor);

        cy.get(testCircleSelector).should("have.length", 5);
        cy.get(testArrowSelector).should("have.length", 4);

        cy.get(testCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", modifiedColor);
            expect($list.eq(2)).to.contain(value);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_IN_MS)

        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($head, index, $list) => {
            cy.get($list.eq(0)).should("contain", "head");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "");
            cy.get($list.eq(4)).should("contain", "");
        });

        cy.get(testTailCircleSelector).each(($tail, index, $list) => {
            cy.get($list.eq(0)).should("contain", "");
            cy.get($list.eq(1)).should("contain", "");
            cy.get($list.eq(2)).should("contain", "");
            cy.get($list.eq(3)).should("contain", "");
            cy.get($list.eq(4)).should("contain", "tail");
        });

        cy.get(testIndexSelector).each(($el, index) => {
            cy.get($el).should("contain", index);
        });
    })

    it('element should be removed from the head of the list', function () {
        cy.get(testRemoveFromHeadButtonSelector).should('not.be.disabled');
        cy.get(testRemoveFromHeadButtonSelector).click();

        cy.get(testCircleSelector).eq(0).invoke('text').then((value) => {
            cy.get(testBottomCircleSelector).contains(value);
            cy.get(testBottomCircleSelector)
                .find(testSmallCircleSelector)
                .should("have.css", "border-color", changingColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).should("have.length", 3);
        cy.get(testArrowSelector).should("have.length", 2);

        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($head, index, $list) => {
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
            cy.get($el).should("contain", index);
        });
    })

    it('element should be removed from the tail of the list', function () {
        cy.get(testRemoveFromTailButtonSelector).should('not.be.disabled');
        cy.get(testRemoveFromTailButtonSelector).click();

        cy.get(testCircleSelector).eq(3).invoke('text').then((value) => {
            cy.get(testBottomCircleSelector).contains(value);
            cy.get(testBottomCircleSelector)
                .find(testSmallCircleSelector)
                .should("have.css", "border-color", changingColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).should("have.length", 3);
        cy.get(testArrowSelector).should("have.length", 2);

        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($head, index, $list) => {
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
            cy.get($el).should("contain", index);
        });
    })

    it('element should be removed by index from the list', function () {
        cy.get(testInputIndexSelector).type(index);
        cy.get(testRemoveByIndexButtonSelector).should('not.be.disabled');
        cy.get(testRemoveByIndexButtonSelector).click();

        cy.get(testCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", changingColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", changingColor);
            cy.get($list.eq(1)).should("have.css", "border-color", changingColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", changingColor);
            cy.get($list.eq(1)).should("have.css", "border-color", changingColor);
            cy.get($list.eq(2)).should("have.css", "border-color", changingColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).eq(2).invoke('text').then((value) => {
            cy.get(testBottomCircleSelector).contains(value);
            cy.get(testBottomCircleSelector)
                .find(testSmallCircleSelector)
                .should("have.css", "border-color", changingColor);
        });
        cy.get(testCircleSelector).eq(2).should("have.css", "border-color", defaultColor);

        cy.wait(DELAY_IN_MS);

        cy.get(testCircleSelector).should("have.length", 3);
        cy.get(testArrowSelector).should("have.length", 2);

        cy.get(testCircleSelector).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(testHeadCircleSelector).each(($head, index, $list) => {
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
            cy.get($el).should("contain", index);
        });
    })
});