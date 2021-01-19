import React, {useState} from "react";
import styles from "./paginator.module.css";
import {InitialStateUsersItemType} from "../../redux/users-reducer";


/*---Типизация компоненты - Paginator---*/
type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

export const Paginator: React.FC<UsersPropsType> = React.memo ( (props, {portionSize = 30}) => {
    /*---Значение общего количества страниц, в зависимотсти от общего количества пользователей(totalUsersCount),
    поделенных на количество отображаемых пользователей на одной странице(по умолчанию: 15), с округление ВСЕГДА в большую сторону---*/
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    /*---Пустой массив, который заполним номерами страниц из переменной выше, с помощью цикла---*/
    let pages: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    /*---Общее количесвтво порций---*/
    const portionPage = Math.ceil(pageCount / portionSize);
    /*---Локальные данные о номере порции---*/
    const [portionNumber, setPortionNumber] = useState<number>(1);
    /*---Вычисление левой и правой границы выбранной порции---*/
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return <div>
{/*---Кнопка, сетает значение и возвращает на первую страницу с пользователями---*/}
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(1);
                props.onPageChanged(1);
            }}> 1... </button>}
{/*---Кнопка, перемещает нас по списку страниц с пользователями---*/}
            {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}> - </button>}
{/*---Отображаем общее количество страниц из массива, и, выделяем выбранную страницу с помощью css---*/}
            {
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => <span onClick={(e) => {props.onPageChanged(p)}}
                                    className={props.currentPage === p ? styles.classActive : ''}> {p} </span>)
            }
{/*---Кнопка, перемещает нас по списку страниц с пользователями---*/}
            {portionPage > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}> + </button>}
{/*---Кнопка, сетает значение и перемещает поиск в конец списка с пользователями---*/}
            {portionPage > portionNumber && <button onClick={() => {
                setPortionNumber(portionPage);
                props.onPageChanged(pageCount);
            }}> {Math.floor(pageCount / 100)}... </button>}
        </div>
});