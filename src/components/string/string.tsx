import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css';
import {Circle} from "../ui/circle/circle";
import {reverse} from "./utils/reverse";
import {ElementStates} from "../../types/element-states";

export type TArray = {
    value: string;
    color: ElementStates;
};
export const StringComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [charArr, setCharArr] = useState<Array<TArray>>([]);
    const [loader, setLoader] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };
    const handleClick = () => {
        const newArr: { value: string, color: ElementStates }[] =
            inputValue.split('').map((value => ({
                value, color: ElementStates.Default
            })));
        reverse(newArr, setCharArr, setLoader);
    };

    return (
        <SolutionLayout title="Строка">
            <div className={styles[`input-wrapper`]}>
                <Input
                    maxLength={11}
                    isLimitText={true}
                    value={inputValue}
                    onChange={onChange}/>
                <Button
                    text="Развернуть"
                    onClick={handleClick}
                    isLoader={loader}
                    disabled={!inputValue}/>
            </div>

            {charArr && (
                <ul className={styles[`solution-list`]}>
                    {charArr.map((char: TArray, index: number) => (
                        <li key={index}>
                            <Circle letter={char.value} state={char.color}/>
                        </li>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
