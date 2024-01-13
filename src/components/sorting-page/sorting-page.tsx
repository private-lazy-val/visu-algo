import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {Column} from "../ui/column/column";
import {
    bubbleSortAscending, bubbleSortDescending,
    getRandomArr,
    selectionSortAscending,
    selectionSortDescending
} from "./utils/sorting-page-utils";

export type TArray = {
    value: number;
    color: ElementStates;
};
export const SortingPage: React.FC = () => {
    const [arr, setArr] = useState<TArray[]>([]);
    const [sortName, setSortName] = useState("Выбор");
    const [sortDirection, setSortDirection] = useState<Direction>();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setArr([...getRandomArr()]);
        return () => {
            setArr([])
        };
    }, []);

    const selectRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortName(event.target.value);
    };

    const handleClick = (sortDirection: Direction) => {
        setSortDirection(sortDirection);
        if (sortDirection === Direction.Ascending && sortName === 'Выбор') {
            selectionSortAscending(arr, setArr, setLoader);
        }
        if (sortDirection === Direction.Descending && sortName === 'Выбор') {
            selectionSortDescending(arr, setArr, setLoader);
        }
        if (sortDirection === Direction.Ascending && sortName === 'Пузырёк') {
            bubbleSortAscending(arr, setArr, setLoader);
        }
        if (sortDirection === Direction.Descending && sortName === 'Пузырёк') {
            bubbleSortDescending(arr, setArr, setLoader);
        }
    }

    const setLoading = (direction: Direction) => {
        return sortDirection === direction && loader;
    };

    const setDisabled = (direction: Direction) => {
        return sortDirection !== direction && loader;
    };

    const generateRandomArr = () => {
        setArr([...getRandomArr()]);
    };

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles[`btns-wrapper`]}>
                <div className={styles[`radio-btns`]}>
                    <RadioInput
                        label="Выбор"
                        value="Выбор"
                        checked={sortName === 'Выбор'}
                        onChange={selectRadioBtn}
                        disabled={loader}
                    />
                    <RadioInput
                        label="Пузырёк"
                        value="Пузырёк"
                        checked={sortName === 'Пузырёк'}
                        onChange={selectRadioBtn}
                        disabled={loader}
                    />
                </div>
                <div className={styles[`sort-btns`]}>
                    <Button
                        text="По возрастанию"
                        sorting={Direction.Ascending}
                        onClick={() => handleClick(Direction.Ascending)}
                        isLoader={setLoading(Direction.Ascending)}
                        disabled={setDisabled(Direction.Ascending)}
                    />
                    <Button
                        text="По убыванию"
                        sorting={Direction.Descending}
                        onClick={() => handleClick(Direction.Descending)}
                        isLoader={setLoading(Direction.Descending)}
                        disabled={setDisabled(Direction.Descending)}
                    />
                </div>
                <Button
                    text="Новый массив"
                    onClick={generateRandomArr}
                    disabled={loader}
                />
            </div>

            {arr.length > 0 && (
                <ul className={styles[`solution-list`]}>
                    {arr.map((item, index) => (
                        <li key={index}>
                            <Column
                                index={item.value}
                                state={item.color}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </SolutionLayout>
    );
};
