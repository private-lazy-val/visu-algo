import {Dispatch, SetStateAction} from "react";
import {delay} from "../../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../../constants/delays";


export const getFibSequence = async (index: number,
                                     setFibArr: Dispatch<SetStateAction<number[]>>,
                                     setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);

    let sequence: number[] = [1];
    if (index >= 0) {
        setFibArr([...sequence]);
        await delay(SHORT_DELAY_IN_MS);
    }
    if (index >= 1) {
        sequence.push(1);
        setFibArr([...sequence]);
        await delay(SHORT_DELAY_IN_MS);
    }

    for (let i = 2; i <= index; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
        setFibArr([...sequence]);
        await delay(SHORT_DELAY_IN_MS);
    }

    setLoader(false);
};