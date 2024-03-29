import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {getFibonacciNumbers} from "./utils/get-fibonacci-numbers";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {useForm} from "../../hooks/use-from";

export const FibonacciPage: React.FC = () => {
    const { values, handleChange } = useForm({ inputValue: '' });
    const [fibArr, setFibArr] = useState<number[]>([]);
    const [loader, setLoader] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoader(true);
        const arr = getFibonacciNumbers(Number(values.inputValue));
        for (let i = 0; i < arr.length; i++) {
            await delay(SHORT_DELAY_IN_MS);
            setFibArr(arr.slice(0, i + 1));
        }
        setLoader(false);
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles[`input-wrapper`]}>
                <Input
                    placeholder="Введите число"
                    type="number"
                    name="inputValue"
                    isLimitText={true}
                    min={1}
                    max={19}
                    value={values.inputValue}
                    onChange={handleChange}
                    extraClass={styles.input}
                />
                <Button
                    text="Рассчитать"
                    type="submit"
                    onClick={handleClick}
                    isLoader={loader}
                    disabled={!values.inputValue || parseInt(values.inputValue) > 19}
                    extraClass={styles[`submit-btn`]}
                    data-testid='submit-btn'
                />
            </div>
            {fibArr.length > 0 && (
                <ul className={styles[`solution-list`]}>
                    {fibArr.map((item, index) => (
                        <li key={index}>
                            <Circle
                                state={ElementStates.Default}
                                letter={item.toString()}
                                index={index}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
