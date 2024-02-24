import { reverseArray } from './utils/reverseArray';
import { ElementStates } from '../../types/element-states';

const mockSetArr = jest.fn();
const mockSetLoader = jest.fn();

describe('reverseArray algorithm', () => {
    it('reverses an array with an even number of characters', async () => {
        const inputArray = [
            { value: 'a', color: ElementStates.Default },
            { value: 'b', color: ElementStates.Default }
        ];

        await reverseArray(inputArray, mockSetArr, mockSetLoader);

        // mockSetArr.mock.calls.pop()[0] gives you the first argument of the last call to the mockSetArr function,
        // enabling you to assert that your code is calling the function with the expected arguments
        expect(mockSetArr.mock.calls.pop()[0]).toEqual([
            { value: 'b', color: ElementStates.Modified },
            { value: 'a', color: ElementStates.Modified }
        ]);
    });

    it('reverses an array with an odd number of characters', async () => {
        const inputArray = [
            { value: 'a', color: ElementStates.Default },
            { value: 'b', color: ElementStates.Default },
            { value: 'c', color: ElementStates.Default }
        ];

        await reverseArray(inputArray, mockSetArr, mockSetLoader);

        expect(mockSetArr.mock.calls.pop()[0]).toEqual([
            { value: 'c', color: ElementStates.Modified },
            { value: 'b', color: ElementStates.Modified },
            { value: 'a', color: ElementStates.Modified }
        ]);
    });

    it('handles an array with a single character', async () => {
        const inputArray = [{ value: 'a', color: ElementStates.Default }];

        await reverseArray(inputArray, mockSetArr, mockSetLoader);
        expect(mockSetArr.mock.calls.pop()[0]).toEqual([
            { value: 'a', color: ElementStates.Modified }
        ]);
    });

    it('handles an empty array', async () => {
        await reverseArray( [], mockSetArr, mockSetLoader);

        expect(mockSetArr).toHaveBeenCalledTimes(0);
    });
});
