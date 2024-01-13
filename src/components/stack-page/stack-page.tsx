import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Stack} from "./stack-class";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";

type TStackItem = {
    value: string;
    color: ElementStates;
};
export const StackPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [stackArr, setStackArr] = useState<TStackItem[]>([]);
    const [addBtnLoader, setAddBtnLoader] = useState(false);
    const [removeBtnLoader, setRemoveBtnLoader] = useState(false);
    const [resetBtnLoader, setResetBtnLoader] = useState(false);

    const [stack] = useState(new Stack<TStackItem>());
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };
    const addElement = async () => {
        setAddBtnLoader(true);
        if (inputValue) {
            stack.push({value: inputValue, color: ElementStates.Changing});
            setInputValue('');
            setStackArr([...stack.getElements()]);
            await delay(SHORT_DELAY_IN_MS);

            stack.peek()!.color = ElementStates.Default;
            setStackArr([...stack.getElements()]);
        }
        setAddBtnLoader(false);
    };

    const removeElement = async () => {
        setRemoveBtnLoader(true);
        stack.peek()!.color = ElementStates.Changing;
        setStackArr([...stack.getElements()]);

        await delay(SHORT_DELAY_IN_MS);
        stack.pop();
        setStackArr([...stack.getElements()]);
        setRemoveBtnLoader(false);
    };

    const resetAll = () => {
        setResetBtnLoader(true);
        stack.clear()
        setStackArr([...stack.getElements()]);
        setResetBtnLoader(false);
    };

    const getTopElement = (arr: TStackItem[], index: number): string => {
        if (index === arr.length - 1) {
            return 'top';
        } else {
            return '';
        }
    }

    return (
        <SolutionLayout title="Стек">
            <div className={styles[`input-wrapper`]}>
                <Input
                    maxLength={4}
                    isLimitText={true}
                    value={inputValue}
                    onChange={onChange}
                    extraClass={styles.input}
                />
                <Button
                    text="Добавить"
                    type="submit"
                    onClick={addElement}
                    disabled={!inputValue || removeBtnLoader || resetBtnLoader}
                    extraClass={styles[`add-btn`]}
                    isLoader={addBtnLoader}
                />
                <Button
                    text="Удалить"
                    onClick={removeElement}
                    disabled={!stackArr.length || addBtnLoader || resetBtnLoader}
                    extraClass={styles[`remove-btn`]}
                    isLoader={removeBtnLoader}
                />
                <Button
                    text="Очистить"
                    type="reset"
                    onClick={resetAll}
                    disabled={!stackArr.length || addBtnLoader || removeBtnLoader}
                    extraClass={styles[`reset-btn`]}
                    isLoader={resetBtnLoader}
                />
            </div>
            {stackArr.length > 0 && (
                <ul className={styles[`solution-list`]}>
                    {stackArr.map((item: TStackItem, index: number) => (
                        <li key={index}>
                            <Circle
                                letter={item.value}
                                state={item.color}
                                index={index}
                                head={getTopElement(stackArr, index)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
