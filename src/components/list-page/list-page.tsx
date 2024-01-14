import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const ListPage: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputIndex, setInputIndex] = useState("");

    const [addHeadBtnLoader, setAddHeadBtnLoader] = useState(false);
    const [removeHeadBtnLoader, setRemoveHeadBtnLoader] = useState(false);
    const [addTailBtnLoader, setAddTailBtnLoader] = useState(false);
    const [removeTailBtnLoader, setRemoveTailBtnLoader] = useState(false);
    const [addByIndexBtnLoader, setAddByIndexBtnLoaderr] = useState(false);
    const [removeByIndexBtnLoader, setRemoveByIndexBtnLoaderr] = useState(false);

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const onIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputIndex(e.target.value);
    };

    return (
        <SolutionLayout title="Связный список">
            <div className={styles[`input-wrapper`]}>
                <div className={styles.row}>
                    <Input
                        placeholder="Введите значение"
                        maxLength={4}
                        isLimitText={true}
                        value={inputValue}
                        onChange={onValueChange}
                        extraClass={styles.input}
                    />
                    <Button
                        text="Добавить в head"
                        type="submit"
                        // onClick={addHead}
                        disabled={!inputValue
                            || removeHeadBtnLoader
                            || addTailBtnLoader
                            || removeTailBtnLoader
                            || addByIndexBtnLoader
                            || removeByIndexBtnLoader}
                        extraClass={styles[`add-head-btn`]}
                        isLoader={addHeadBtnLoader}
                    />
                    <Button
                        text="Добавить в tail"
                        type="submit"
                        // onClick={addTail}
                        disabled={!inputValue
                            || addHeadBtnLoader
                            || removeHeadBtnLoader
                            || removeTailBtnLoader
                            || addByIndexBtnLoader
                            || removeByIndexBtnLoader}
                        extraClass={styles[`add-tail-btn`]}
                        isLoader={addTailBtnLoader}
                    />
                    <Button
                        text="Удалить из head"
                        // onClick={removeHead}
                        disabled={addHeadBtnLoader
                            || addTailBtnLoader
                            || removeTailBtnLoader
                            || addByIndexBtnLoader
                            || removeByIndexBtnLoader}
                        extraClass={styles[`remove-head-btn`]}
                        isLoader={removeHeadBtnLoader}
                    />
                    <Button
                        text="Удалить из tail"
                        // onClick={removeTail}
                        disabled={addHeadBtnLoader
                            || addTailBtnLoader
                            || removeHeadBtnLoader
                            || addByIndexBtnLoader
                            || removeByIndexBtnLoader}
                        extraClass={styles[`remove-tail-btn`]}
                        isLoader={removeTailBtnLoader}
                    />
                </div>
                <div className={styles.row}>
                    <Input
                        placeholder="Введите индекс"
                        value={inputIndex}
                        onChange={onIndexChange}
                        extraClass={styles.input}
                    />
                    <Button
                        text="Добавить по индексу"
                        // onClick={addByIndex}
                        disabled={(!inputIndex && !inputValue)
                            || !inputIndex
                            || addHeadBtnLoader
                            || addTailBtnLoader
                            || removeHeadBtnLoader
                            || removeTailBtnLoader
                            || removeByIndexBtnLoader}
                        extraClass={styles[`add-by-index-btn`]}
                        isLoader={addByIndexBtnLoader}
                    />
                    <Button
                        text="Удалить по индексу"
                        // onClick={removeByIndex}
                        disabled={(!inputIndex && !inputValue)
                            || !inputIndex
                            || addHeadBtnLoader
                            || addTailBtnLoader
                            || removeHeadBtnLoader
                            || removeTailBtnLoader
                            || addByIndexBtnLoader}
                        extraClass={styles[`remove-by-index-btn`]}
                        isLoader={removeByIndexBtnLoader}
                    />
                </div>
            </div>
        </SolutionLayout>
    );
};
