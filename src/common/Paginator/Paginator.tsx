import React from "react";
import styles from "./paginator.module.css";
import {InitialStateUsersItemType} from "../../redux/users-reducer";


/*---Типизация компоненты - Paginator---*/
type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

export const Paginator: React.FC<UsersPropsType> = (props) => {
    /*---Значение общего количества страниц, в зависимотсти от общего количества пользователей(totalUsersCount),
    поделенных на количество отображаемых пользователей на одной странице(по умолчанию: 15), с округление ВСЕГДА в большую сторону---*/
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    /*---Пустой массив, который заполним номерами страниц из переменной выше, с помощью цикла---*/
    let pages: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }


    return <div>
            {/*---Отображаем общее количество страниц из массива, и, выделяем выбранную страницу с помощью css---*/}
            {
                pages.map(p => <span onClick={(e) => {
                    props.onPageChanged(p)
                }}
                                     className={props.currentPage === p ? styles.classActive : ''}> {p} </span>)
            }
        </div>
}