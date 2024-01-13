import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css';
import {Circle} from "../ui/circle/circle";
import {reverse} from "./utils/reverse";
import {ElementStates} from "../../types/element-states";

export type TArrayItem = {
    value: string;
    color: ElementStates;
};
export const StringComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [arr, setArr] = useState<Array<TArrayItem>>([]);
    const [loader, setLoader] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };
    const handleClick = () => {
        const newArr: { value: string, color: ElementStates }[] =
            inputValue.split('').map((value => ({
                value, color: ElementStates.Default
            })));
        reverse(newArr, setArr, setLoader);
    };

    return (
        <SolutionLayout title="Строка">
            <div className={styles[`input-wrapper`]}>
                <Input
                    maxLength={11}
                    isLimitText={true}
                    value={inputValue}
                    onChange={onChange}
                    extraClass={styles.input}
                />
                <Button
                    text="Развернуть"
                    type="submit"
                    onClick={handleClick}
                    isLoader={loader}
                    disabled={!inputValue}
                    extraClass={styles[`submit-btn`]}
                />
            </div>

            {arr.length > 0 && (
                <ul className={styles[`solution-list`]}>
                    {arr.map((char: TArrayItem, index: number) => (
                        <li key={index}>
                            <Circle
                                letter={char.value}
                                state={char.color}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
