import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {LinkedList} from "./list-class";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {getRandomArrayWIthMaxLength} from "../../utils/get-random-array";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {delay} from "../../utils/delay";
import {DELAY_IN_MS} from "../../constants/delays";

type TListItem = {
    value: string;
    color: ElementStates;
};

type LoaderStates = {
    addHead: boolean;
    removeHead: boolean;
    addTail: boolean;
    removeTail: boolean;
    addByIndex: boolean;
    removeByIndex: boolean;
};

const initialLoaderStates: LoaderStates = {
    addHead: false,
    removeHead: false,
    addTail: false,
    removeTail: false,
    addByIndex: false,
    removeByIndex: false,
};

const initialArray: string[] = getRandomArrayWIthMaxLength(4, 9999);
export const ListPage: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputIndex, setInputIndex] = useState("");

    const [loaderStates, setLoaderStates] = useState<LoaderStates>(initialLoaderStates);

    const [addNodeToHeadOperation, setAddNodeToHeadOperation] = useState(false);
    const [addNodeToTailOperation, setAddNodeToTailOperation] = useState(false);
    const [removeNodeFromHeadOperation, setRemoveNodeFromHeadOperation] = useState(false);
    const [removeNodeFromTailOperation, setRemoveNodeFromTailOperation] = useState(false);
    const [addNodeByIndexOperation, setAddNodeByIndexOperation] = useState(false);
    const [removeNodeByIndexOperation, setRemoveNodeByIndexOperation] = useState(false);


    // the index on the Node where the new Node should go
    const [inputValueIndex, setInputValueIndex] = useState<number>(0);
    // temporary storage for the Node to be deleted
    const [circleTempValue, setCircleTempValue] = useState<string>('');

    const [list] = useState(new LinkedList<string>(initialArray));
    const [listArr, setListArr] =
        useState<TListItem[]>(list.toArrayWithDefaultColor());

    const isAnyLoaderActive = (): boolean => {
        return Object.values(loaderStates).some(state => state);
    };

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };
    const onIndexChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputIndex(e.target.value);
    };

    const addNodeToHead = async (e: React.MouseEvent): Promise<void> => {
        e.preventDefault();
        if (inputValue && list.getSize() < 6) {
            setLoaderStates(prev => ({...prev, addHead: true}));
            setInputValueIndex(0);

            setAddNodeToHeadOperation(true);
            list.prepend(inputValue);
            await delay(DELAY_IN_MS);
            setAddNodeToHeadOperation(false);

            const newArr = list.toArrayWithDefaultColor();
            newArr[0].color = ElementStates.Modified;
            setListArr(newArr);
            await delay(DELAY_IN_MS);
            newArr[0].color = ElementStates.Default;
            setListArr(newArr);

            // reset
            setInputValueIndex(0);
            setInputValue("");
            setLoaderStates(prev => ({...prev, addHead: false}));
        }
    }

    const addNodeToTail = async (e: React.MouseEvent): Promise<void> => {
        e.preventDefault();
        if (inputValue && list.getSize() < 6) {
            setLoaderStates(prev => ({...prev, addTail: true}));
            setInputValueIndex(list.getSize() - 1);

            setAddNodeToTailOperation(true);
            list.append(inputValue);
            await delay(DELAY_IN_MS);
            setAddNodeToTailOperation(false);

            const newArr = list.toArrayWithDefaultColor();
            newArr[newArr.length - 1].color = ElementStates.Modified;
            setListArr(newArr);
            await delay(DELAY_IN_MS);
            newArr[newArr.length - 1].color = ElementStates.Default;
            setListArr(newArr);

            // reset
            setInputValueIndex(0);
            setInputValue("");
            setLoaderStates(prev => ({...prev, addTail: false}));
        }
    }

    const removeNodeFromHead = async (): Promise<void> => {
        if (list.getSize() > 0) {
            setLoaderStates(prev => ({...prev, removeHead: true}));
            const newArr = list.toArrayWithDefaultColor();
            setInputValueIndex(0);
            setCircleTempValue(newArr[0].value);

            setRemoveNodeFromHeadOperation(true);
            newArr[0].value = '';
            setListArr(newArr);
            await delay(DELAY_IN_MS);
            list.deleteHead();
            setRemoveNodeFromHeadOperation(false);

            setListArr(list.toArrayWithDefaultColor());

            // reset
            setCircleTempValue("");
            setLoaderStates(prev => ({...prev, removeHead: false}));
        }
    }

    const removeNodeFromTail = async (): Promise<void> => {
        if (list.getSize() > 0) {
            setLoaderStates(prev => ({...prev, removeTail: true}));
            const newArr = list.toArrayWithDefaultColor();
            const lastItemIndex = newArr.length - 1;
            setInputValueIndex(lastItemIndex);
            setCircleTempValue(newArr[lastItemIndex].value);

            setRemoveNodeFromTailOperation(true);
            newArr[lastItemIndex].value = '';
            setListArr(newArr);
            await delay(DELAY_IN_MS);
            list.deleteTail();
            setRemoveNodeFromTailOperation(false);

            setListArr(list.toArrayWithDefaultColor());

            // reset
            setInputValueIndex(0);
            setCircleTempValue("");
            setLoaderStates(prev => ({...prev, removeTail: false}));
        }
    }

    const addNodeByIndex = async (e: React.MouseEvent): Promise<void> => {
        e.preventDefault();
        if ((Number(inputIndex) < 6) && list.getSize() < 6 && inputValue && (list.getSize() >= Number(inputIndex))) {
            setLoaderStates(prev => ({...prev, addByIndex: true}));

            setAddNodeByIndexOperation(true);
            let newArr = list.toArrayWithDefaultColor();
            for (let i = 0; i <= Number(inputIndex); i++) {
                setInputValueIndex(i);
                await delay(DELAY_IN_MS);
                if(i === Number(inputIndex) - 1 && Number(inputIndex) === newArr.length) {
                    newArr = [...newArr, {value: '', color: ElementStates.Default}]
                }
                if (i < Number(inputIndex)) {
                    newArr[i].color = ElementStates.Changing;
                    setListArr(newArr);
                } else if (i === Number(inputIndex)) {
                    setListArr(newArr);
                }
            }

            list.addByIndex(Number(inputIndex), inputValue);
            setAddNodeByIndexOperation(false);

            const finalArr = list.toArrayWithDefaultColor();
            finalArr[Number(inputIndex)].color = ElementStates.Modified;
            setListArr(finalArr);
            await delay(DELAY_IN_MS);
            finalArr[Number(inputIndex)].color = ElementStates.Default;
            setListArr(finalArr);

            // reset
            setInputValueIndex(0);
            setInputValue("");
            setInputIndex("");
            setLoaderStates(prev => ({...prev, addByIndex: false}));
        }
    }

    const removeNodeByIndex = async (): Promise<void> => {
        if ((Number(inputIndex) < 6) && list.getSize() > 0 && (list.getSize() - 1 >= Number(inputIndex))) {
            setLoaderStates(prev => ({...prev, removeByIndex: true}));
            const newArr = list.toArrayWithDefaultColor();
            setInputValueIndex(Number(inputIndex));
            setCircleTempValue(newArr[Number(inputIndex)].value);
            for (let i = 0; i <= Number(inputIndex); i++) {
                newArr[i].color = ElementStates.Changing;
                setListArr([...newArr]);
                await delay(DELAY_IN_MS);
            }

            setRemoveNodeByIndexOperation(true);
            newArr[Number(inputIndex)].value = '';
            newArr[Number(inputIndex)].color = ElementStates.Default;
            setListArr(newArr);
            await delay(DELAY_IN_MS);
            list.deleteByIndex(Number(inputIndex));
            setRemoveNodeByIndexOperation(false);

            const finalArr = list.toArrayWithDefaultColor();
            setListArr(finalArr);

            // reset
            setCircleTempValue("");
            setInputValueIndex(0);
            setInputIndex("");
            setLoaderStates(prev => ({...prev, removeByIndex: false}));
        }
    }

    const isHead = (index: number) => {
        if (listArr.length === 1 && addNodeToTailOperation) {
            return '';
        } else if (index === 0 && !addNodeToHeadOperation && !addNodeByIndexOperation) {
            return 'head';
        } else if (index === 0 && addNodeByIndexOperation && inputValueIndex !== 0) {
            return 'head';
        } else {
            return '';
        }
    };

    const isTail = (index: number) => {
        if (listArr.length === 1 && removeNodeFromHeadOperation) {
            return '';
        } else if (index === listArr.length - 1 && !removeNodeFromTailOperation && !removeNodeByIndexOperation) {
            return 'tail';
        } else {
            return '';
        }
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
                        onClick={addNodeToHead}
                        disabled={!inputValue || isAnyLoaderActive() || list.getSize() >= 6}
                        extraClass={styles[`add-head-btn`]}
                        isLoader={loaderStates.addHead}
                    />
                    <Button
                        text="Добавить в tail"
                        type="submit"
                        onClick={addNodeToTail}
                        disabled={!inputValue || isAnyLoaderActive() || list.getSize() >= 6}
                        extraClass={styles[`add-tail-btn`]}
                        isLoader={loaderStates.addTail}
                    />
                    <Button
                        text="Удалить из head"
                        onClick={removeNodeFromHead}
                        disabled={isAnyLoaderActive() || list.getSize() === 0}
                        extraClass={styles[`remove-head-btn`]}
                        isLoader={loaderStates.removeHead}
                    />
                    <Button
                        text="Удалить из tail"
                        onClick={removeNodeFromTail}
                        disabled={isAnyLoaderActive() || list.getSize() === 0}
                        extraClass={styles[`remove-tail-btn`]}
                        isLoader={loaderStates.removeTail}
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
                        type="submit"
                        onClick={addNodeByIndex}
                        disabled={!inputValue
                            || !inputIndex
                            || isAnyLoaderActive()
                            || list.getSize() >= 6
                            || list.getSize() < Number(inputIndex)
                            || (Number(inputIndex) >= 6)}
                        extraClass={styles[`add-by-index-btn`]}
                        isLoader={loaderStates.addByIndex}
                    />
                    <Button
                        text="Удалить по индексу"
                        onClick={removeNodeByIndex}
                        disabled={!inputIndex
                            || isAnyLoaderActive()
                            || list.getSize() === 0
                            || list.getSize() - 1 < Number(inputIndex)
                            || (Number(inputIndex) >= 6)}
                        extraClass={styles[`remove-by-index-btn`]}
                        isLoader={loaderStates.removeByIndex}
                    />
                </div>
            </div>
            {listArr.length > 0 && (
                <ul className={styles[`solution-list`]}>
                    {listArr.map((item: TListItem, index: number) => (
                        <>
                            <li key={index} className={styles[`solution-list__item`]}>
                                {isAnyLoaderActive()
                                    && (addNodeToHeadOperation
                                        || addNodeToTailOperation
                                        || addNodeByIndexOperation)
                                    && index === inputValueIndex
                                    && <Circle
                                        extraClass={styles[`small-top-circle`]}
                                        isSmall
                                        letter={inputValue}
                                        state={ElementStates.Changing}
                                    />}
                                {isAnyLoaderActive()
                                    && (removeNodeFromHeadOperation
                                        || removeNodeFromTailOperation
                                        || removeNodeByIndexOperation)
                                    && index === inputValueIndex
                                    && <Circle
                                        extraClass={styles[`small-bottom-circle`]}
                                        isSmall
                                        letter={circleTempValue}
                                        state={ElementStates.Changing}
                                    />}
                                <Circle
                                    index={index}
                                    head={isHead(index)}
                                    tail={isTail(index)}
                                    letter={(item.value)}
                                    state={item.color}
                                />
                            </li>
                            {index !== listArr.length - 1 && <ArrowIcon/>}
                        </>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
