import {ElementStates} from "../../../types/element-states";
import {swap} from "../../../utils/swap";
import {TArrayItem} from "../sorting-page";
import {Dispatch, SetStateAction} from "react";
import {DELAY_IN_MS} from "../../../constants/delays";
import {delay} from "../../../utils/delay";

// Reset columns' colors before running a sorting algorithm
const resetColors = (arr: TArrayItem[]) => {
    arr.forEach(item => item.color = ElementStates.Default);
};

export const selectionSortAscending = async (arr: TArrayItem[],
                                             setArr: Dispatch<SetStateAction<TArrayItem[]>>,
                                             setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);
    resetColors(arr);
    if (arr.length > 1) {
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < arr.length; j++) {
                arr[i].color = ElementStates.Changing;
                arr[j].color = ElementStates.Changing;
                setArr([...arr]);
                await delay(DELAY_IN_MS);

                if (arr[j].value < arr[minIndex].value) {
                    minIndex = j;
                }
                arr[j].color = ElementStates.Default;
                setArr([...arr]);
            }

            if (minIndex !== i) {
                swap(arr, i, minIndex);
                arr[i].color = ElementStates.Modified;
                arr[minIndex].color = ElementStates.Default;
                setArr([...arr]);
            } else {
                arr[minIndex].color = ElementStates.Modified;
                setArr([...arr]);
            }
        }
        arr[arr.length - 1].color = ElementStates.Modified;
        setArr([...arr]);
    }
    setLoader(false);
}

export const selectionSortDescending = async (arr: TArrayItem[],
                                              setArr: Dispatch<SetStateAction<TArrayItem[]>>,
                                              setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);
    resetColors(arr);
    if (arr.length > 1) {
        for (let i = 0; i < arr.length - 1; i++) {
            let maxIndex = i;

            for (let j = i + 1; j < arr.length; j++) {
                arr[i].color = ElementStates.Changing;
                arr[j].color = ElementStates.Changing;
                setArr([...arr]);
                await delay(DELAY_IN_MS);

                if (arr[j].value > arr[maxIndex].value) {
                    maxIndex = j;
                }
                arr[j].color = ElementStates.Default;
                setArr([...arr]);
            }

            if (maxIndex !== i) {
                swap(arr, i, maxIndex);
                arr[i].color = ElementStates.Modified;
                arr[maxIndex].color = ElementStates.Default;
                setArr([...arr]);
            } else {
                arr[maxIndex].color = ElementStates.Modified;
            }
        }
        arr[arr.length - 1].color = ElementStates.Modified;
        setArr([...arr]);
    }
    setLoader(false);
}

export const bubbleSortAscending = async (arr: TArrayItem[],
                                          setArr: Dispatch<SetStateAction<TArrayItem[]>>,
                                          setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);
    resetColors(arr);
    if (arr.length > 1) {
        for (let i = 0; i < arr.length - 1; i++) {
            let swapped = false;
            for (let j = 0; j < arr.length - i - 1; j++) {
                arr[j].color = ElementStates.Changing;
                arr[j + 1].color = ElementStates.Changing;
                setArr([...arr]);
                await delay(DELAY_IN_MS);

                if (arr[j].value > arr[j + 1].value) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }
                if (i === arr.length - 2) {
                    arr[j].color = ElementStates.Modified;
                } else {
                    arr[j].color = ElementStates.Default;
                }
                setArr([...arr]);
            }
            if (!swapped) {
                for (let k = 0; k < arr.length - i; k++) {
                    arr[k].color = ElementStates.Modified;
                    setArr([...arr]);
                }
                break;
            }
            arr[arr.length - i - 1].color = ElementStates.Modified;
            setArr([...arr]);
        }
    }
    setLoader(false);
}

export const bubbleSortDescending = async (arr: TArrayItem[],
                                           setArr: Dispatch<SetStateAction<TArrayItem[]>>,
                                           setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);
    resetColors(arr);
    if (arr.length > 1) {
        for (let i = 0; i < arr.length - 1; i++) {
            let swapped = false;
            for (let j = 0; j < arr.length - i - 1; j++) {
                arr[j].color = ElementStates.Changing;
                arr[j + 1].color = ElementStates.Changing;
                setArr([...arr]);
                await delay(DELAY_IN_MS);

                if (arr[j].value < arr[j + 1].value) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }

                if (i === arr.length - 2) {
                    arr[j].color = ElementStates.Modified;
                } else {
                    arr[j].color = ElementStates.Default;
                }
                setArr([...arr]);
            }
            if (!swapped) {
                for (let k = 0; k < arr.length - i; k++) {
                    arr[k].color = ElementStates.Modified;
                    setArr([...arr]);
                }
                break;
            }
            arr[arr.length - i - 1].color = ElementStates.Modified;
            setArr([...arr]);
        }
    }
    setLoader(false);
}