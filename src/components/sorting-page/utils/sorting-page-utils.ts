import {ElementStates} from "../../../types/element-states";
import {swap} from "../../../utils/swap";
import {getRandomInt} from "../../../utils/get-random-int";
import {TArray} from "../sorting-page";
import {Dispatch, SetStateAction} from "react";
import {DELAY_IN_MS} from "../../../constants/delays";
import {delay} from "../../../utils/delay";

export const getRandomArr = (): TArray[] => {
    const arr: TArray[] = [];
    const arrLength = getRandomInt(3, 17);
    for (let i = 0; i < arrLength; i++) {
        arr.push({value: Math.floor(Math.random() * 101), color: ElementStates.Default});
    }
    return arr;
}

export const selectionSortAscending = async (arr: TArray[],
                                             setArr: Dispatch<SetStateAction<TArray[]>>,
                                             setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);

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
    setLoader(false);
}

export const selectionSortDescending = async (arr: TArray[],
                                              setArr: Dispatch<SetStateAction<TArray[]>>,
                                              setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);

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
    setLoader(false);
}

export const bubbleSortAscending = async (arr: TArray[],
                                          setArr: Dispatch<SetStateAction<TArray[]>>,
                                          setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);

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
            arr[j].color = ElementStates.Default;
            setArr([...arr]);
        }
        if (!swapped) {
            for(let k = 0; k < arr.length - i; k++) {
                arr[k].color = ElementStates.Modified;
                setArr([...arr]);
            }
            break;
        }
        arr[arr.length - i - 1].color = ElementStates.Modified;
        setArr([...arr]);
    }
    setLoader(false);
}

export const bubbleSortDescending = async (arr: TArray[],
                                           setArr: Dispatch<SetStateAction<TArray[]>>,
                                           setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);

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
            arr[j].color = ElementStates.Default;
            setArr([...arr]);
        }
        if (!swapped) {
            for(let k = 0; k < arr.length - i; k++) {
                arr[k].color = ElementStates.Modified;
                setArr([...arr]);
            }
            break;
        }
        arr[arr.length - i - 1].color = ElementStates.Modified;
        setArr([...arr]);
    }
    setLoader(false);
}