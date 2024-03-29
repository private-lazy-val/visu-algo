import {ElementStates} from "../../../types/element-states";
import {Dispatch, SetStateAction} from "react";
import {DELAY_IN_MS} from "../../../constants/delays";
import {delay} from "../../../utils/delay";
import {TArrayItem} from "../string";
import {swap} from "../../../utils/swap";

// Reserve in place
export const reverseArray = async (arr: TArrayItem[],
                                   setCharArr: Dispatch<SetStateAction<TArrayItem[]>>,
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