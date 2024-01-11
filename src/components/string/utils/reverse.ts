import {ElementStates} from "../../../types/element-states";
import {Dispatch, SetStateAction} from "react";
import {DELAY_IN_MS} from "../../../constants/delays";
import {delay} from "../../../utils/delay";
import {TArray} from "../string";

export const swap = (arr: TArray[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
};

export const reverse = async (arr: TArray[],
                        setCharArr: Dispatch<SetStateAction<TArray[]>>,
                        setLoader: Dispatch<SetStateAction<boolean>>) => {

    setLoader(true);

    const mid = Math.ceil(arr.length / 2);

    for (let i = 0; i < mid; i++) {

        let j = arr.length - 1 - i;

        if (i !== j) {
            arr[i].color = ElementStates.Changing;
            arr[j].color = ElementStates.Changing;
            setCharArr([...arr]);
            await delay(DELAY_IN_MS);
        }

        swap(arr, i, j);

        arr[i].color = ElementStates.Modified;
        arr[j].color = ElementStates.Modified;

        setCharArr([...arr]);
    }
    setLoader(false);
};