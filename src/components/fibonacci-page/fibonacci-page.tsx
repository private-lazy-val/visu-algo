import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../string/string.module.css";

import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {getFibSequence} from "./utils/get-fib-sequence";

export const FibonacciPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [fibArr, setFibArr] = useState<number[]>([]);
    const [loader, setLoader] = useState(false);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const handleClick = () => {
        if (parseInt(inputValue) <= 19) {
            getFibSequence(parseInt(inputValue), setFibArr, setLoader);
        }
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles[`input-wrapper`]}>
                <Input
                    placeholder="Введите число"
                    type="number"
                    isLimitText={true}
                    min={1}
                    max={19}
                    value={inputValue}
                    onChange={onChange}
                />
                <Button
                    text="Рассчитать"
                    onClick={handleClick}
                    isLoader={loader}
                    disabled={!inputValue}/>
            </div>
            {fibArr && (
                <ul className={styles[`solution-list`]}>
                    {fibArr.map((number, index) => (
                        <li key={index}>
                            <Circle
                                state={ElementStates.Default}
                                letter={number.toString()}
                                tailType="string"
                                tail={index.toString()}/>
                        </li>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
