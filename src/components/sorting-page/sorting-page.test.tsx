import {ElementStates} from "../../types/element-states";
import {bubbleSortAscending, bubbleSortDescending, selectionSortAscending, selectionSortDescending} from "./utils/sorting-page-utils";
import {TArrayItem} from "./sorting-page";

const singleElementArray: TArrayItem[] = [{ value: 1, color: ElementStates.Default }];

const multipleElementsArray: TArrayItem[] = [
    { value: 2, color: ElementStates.Default },
    { value: 3, color: ElementStates.Default },
    { value: 1, color: ElementStates.Default },
];

const sortedArrayAscending = [
    { value: 1, color: ElementStates.Modified },
    { value: 2, color: ElementStates.Modified },
    { value: 3, color: ElementStates.Modified },
];

const sortedArrayDescending = [
    { value: 3, color: ElementStates.Modified },
    { value: 2, color: ElementStates.Modified },
    { value: 1, color: ElementStates.Modified },
];

const mockSetArr = jest.fn();
const mockSetLoader = jest.fn();
describe('Selection Sort Ascending', () => {
    it('sorts an empty array', async () => {
        await selectionSortAscending([], mockSetArr, mockSetLoader);

        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with one element', async () => {
        await selectionSortAscending(singleElementArray, mockSetArr, mockSetLoader);

        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with multiple elements', async () => {
        await selectionSortAscending(multipleElementsArray, mockSetArr, mockSetLoader);

        // Check if the last call to mockSetArr contains the sorted array
        expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrayAscending);
    });
});

describe('Selection Sort Descending', () => {
    it('sorts an empty array', async() => {
        await selectionSortDescending([], mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with one element', async() => {
        await selectionSortDescending(singleElementArray, mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with multiple elements', async() => {
        await selectionSortDescending(multipleElementsArray, mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrayDescending);
    });
});

describe('Bubble Sort Ascending', () => {
    it('sorts an empty array', async() => {
        await bubbleSortAscending([], mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with one element', async() => {
        await bubbleSortAscending(singleElementArray, mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with multiple elements', async() => {
        await bubbleSortAscending(multipleElementsArray, mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrayAscending);
    });
});

describe('Bubble Sort Descending', () => {
    it('sorts an empty array', async() => {
        await bubbleSortDescending([], mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with one element', async() => {
        await bubbleSortDescending(singleElementArray, mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });

    it('sorts an array with multiple elements', async() => {
        await bubbleSortDescending(multipleElementsArray, mockSetArr, mockSetLoader);
        expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrayDescending);
    });
});
