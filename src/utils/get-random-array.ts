import {ElementStates} from "../types/element-states";
import {getRandomInt} from "./get-random-int";

export const getRandomArrayWIthMaxLength = (maxLength: number, maxNumber: number): string[] => {
    return Array.from({length: maxLength},
        () => (getRandomInt(0, maxNumber).toString()));
}

export const getRandomArrayWithMinAndMaxLengthAndDefaultColor = (minLength: number, maxLength: number, maxNumber: number): {
    value: number,
    color: ElementStates
}[] => {
    const arrLength = getRandomInt(minLength, maxLength);
    return Array.from({length: arrLength},
        () => ({
            value: getRandomInt(0, maxNumber),
            color: ElementStates.Default
        }));
}