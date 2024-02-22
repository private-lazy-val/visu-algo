import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css';
import {Circle} from "../ui/circle/circle";
import {reverseArray} from "./utils/reverseArray";
import {ElementStates} from "../../types/element-states";
import {useForm} from "../../hooks/use-from";

export type TArrayItem = {
    value: string;
    color: ElementStates;
};
export const StringComponent: React.FC = () => {
    const { values, handleChange } = useForm({ inputValue: '' });

    const [arr, setArr] = useState<Array<TArrayItem>>([]);
    const [loader, setLoader] = useState(false);

    const handleClick = (e: React.MouseEvent): void => {
        e.preventDefault();
        const newArr: TArrayItem[] =
            values.inputValue.split('').map(value => ({
                value, color: ElementStates.Default
            }));
        reverseArray(newArr, setArr, setLoader);
    };

    return (
        <SolutionLayout title="Строка">
            <div className={styles[`input-wrapper`]}>
                <Input
                    name="inputValue"
                    maxLength={11}
                    isLimitText={true}
                    value={values.inputValue}
                    onChange={handleChange}
                    extraClass={styles.input}
                />
                <Button
                    text="Развернуть"
                    type="submit"
                    onClick={handleClick}
                    isLoader={loader}
                    disabled={!values.inputValue}
                    extraClass={styles[`submit-btn`]}
                    data-testid='submit-btn'
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
