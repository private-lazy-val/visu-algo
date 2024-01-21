import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from './queue-page.module.css';
import {ElementStates} from "../../types/element-states";
import {Queue} from "./queue-class";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {useForm} from "../../hooks/use-from";

type TQueueItem = {
    value?: string;
    color?: ElementStates;
};

const emptyQueue = Array.from({length: 7},
    () => ({value: '', color: ElementStates.Default}));

export const QueuePage: React.FC = () => {
    const { values, setValues, handleChange } = useForm({ inputValue: '' });
    const [addBtnLoader, setAddBtnLoader] = useState(false);
    const [removeBtnLoader, setRemoveBtnLoader] = useState(false);
    const [resetBtnLoader, setResetBtnLoader] = useState(false);

    const [queueArr, setQueueArr] = useState<TQueueItem[]>(emptyQueue);
    const [queue] = useState(new Queue<TQueueItem>(7));

    const addElement = async (e: React.MouseEvent) => {
        e.preventDefault();
        setAddBtnLoader(true);

        if (values.inputValue) {
            setValues({ ...values, inputValue: '' });
            queueArr[queue.getTail()] = {color: ElementStates.Changing};
            setQueueArr([...queueArr]);
            await delay(SHORT_DELAY_IN_MS);
            queue.enqueue({value: values.inputValue});
            queueArr[queue.getPreTail()] = {value: values.inputValue, color: ElementStates.Changing};
            setQueueArr([...queueArr]);
            await delay(SHORT_DELAY_IN_MS);
            queueArr[queue.getPreTail()] = {value: values.inputValue, color: ElementStates.Default};
            setQueueArr([...queueArr]);
        }
        setAddBtnLoader(false);
    };

    const removeElement = async () => {
        setRemoveBtnLoader(true);

        queue.peek()!.color = ElementStates.Changing;
        queueArr[queue.getHead()] = {color: ElementStates.Changing};
        setQueueArr([...queueArr]);
        await delay(SHORT_DELAY_IN_MS);

        queueArr[queue.getHead()] = {value: '', color: ElementStates.Default};
        queue.dequeue();
        setQueueArr([...queueArr]);

        setRemoveBtnLoader(false);
    };

    const resetAll = () => {
        setResetBtnLoader(true);
        queue.clear();
        setQueueArr(Array.from({length: 7},
            () => ({value: '', color: ElementStates.Default}))); // reflect the changes made on queue
        setResetBtnLoader(false);
    };

    return (
        <SolutionLayout title="Очередь">
            <div className={styles[`input-wrapper`]}>
                <Input
                    name="inputValue"
                    maxLength={4}
                    isLimitText={true}
                    value={values.inputValue}
                    onChange={handleChange}
                    extraClass={styles.input}
                />
                <Button
                    text="Добавить"
                    type="submit"
                    onClick={addElement}
                    disabled={!values.inputValue || !queue.hasRoom() || removeBtnLoader || resetBtnLoader}
                    extraClass={styles[`add-btn`]}
                    isLoader={addBtnLoader}
                />
                <Button
                    text="Удалить"
                    onClick={removeElement}
                    disabled={queue.isEmpty() || addBtnLoader || resetBtnLoader}
                    extraClass={styles[`remove-btn`]}
                    isLoader={removeBtnLoader}
                />
                <Button
                    text="Очистить"
                    type="reset"
                    onClick={resetAll}
                    disabled={queue.isEmpty() || addBtnLoader || removeBtnLoader}
                    extraClass={styles[`reset-btn`]}
                    isLoader={resetBtnLoader}
                />
            </div>
            {queueArr && (
                <ul className={styles[`solution-list`]}>
                    {queueArr.map((item: TQueueItem, index: number) => (
                        <li key={index}>
                            <Circle
                                letter={item.value}
                                state={item.color}
                                index={index}
                                head={(index === queue.getHead() && !queue.isEmpty()) ? 'head' : ''}
                                tail={(index === queue.getPreTail() && !queue.isEmpty()) ? 'tail' : ''}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
