import React from "react";
import userPhoto from "./../../assets/image/userPhoto.png"
import {InitialStateUsersItemType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import styles from "./users.module.css";


/*---Типизация компоненты - Users---*/
type UsersPropsType = {
    users: Array<InitialStateUsersItemType>
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number | string) => void
    followingInProgress: Array<number | string>
    totalUsersCount: number
    pageSize: number
    currentPage: number
}


function Users(props: UsersPropsType) {
    /*---Значение общего количества страниц, в зависимотсти от общего количества пользователей(totalUsersCount),
    поделенных на количество отображаемых пользователей на одной странице(по умолчанию: 15), с округление ВСЕГДА в большую сторону---*/
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    /*---Пустой массив, который заполним номерами страниц из переменной выше, с помощью цикла---*/
    let pages: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }


    return <div>
        <div>
            {/*---Отображаем общее количество страниц из массива, и, выделяем выбранную страницу с помощью css---*/}
            {
                pages.map( p => <span onClick={ (e) => {props.onPageChanged(p)} }
                                      className={props.currentPage === p ? styles.classActive : ''}> {p} </span> )
            }
        </div>
        {/*---Проходим по массиву пользователей и отображаем для каждого из них данные(аватар, имя, статус и тд), а также кнопку подписаться/отписаться---*/}
        {
            props.users.map( u => <div key={u.id}>
                <div className={styles.userData}>
                    {/*---Отображаем список пользователей с аватаром и кнопкой подписаться---*/}
                    <div className={styles.userAvatarButton}>
                        {/*---Делаем переходим на страницу отдельно взятого пользователя кликнув по его аватару---*/}
                        <NavLink to={'/profile/'+ u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="asd" width={'100px'}/>
                        </NavLink>
                        {/*---Отображаем нужну кнопку в зависимости от данных с сервера о подписке, если не подписаны - "подписаться", если подписаны - "отписаться"---*/}
                        {u.followed ?
                            /*---Делаем кнопку подписаться/отписаться НЕАКТИВНОЙ пока выполняется запрос, если она была единожды нажата---*/
                            /*---По клику на кнопку, запускаем колбек, который запустит санку с запросом на сервер о подписке и переведёт кнопку в другое положение---*/
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {props.unfollow(u.id)}}>unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {props.follow(u.id)}}>follow</button>
                        }
                    </div>
                    {/*---Отображаем имя и статус пользователя, и немного информации---*/}
                    <div className={styles.description}>
                        {/*---Отображаем имя пользователя и статус пользователя---*/}
                        <div className={styles.descriptionInformation}>
                            <span style={{fontWeight: "bold"}}>{u.name}</span>
                            {u.status === null ? '' : <span style={{color: 'lightblue'}}>"{u.status}"</span>}
                        </div>
                        {/*---Отображаем страну и город пользователя---*/}
                        <div className={styles.descriptionLocation}>
                            <span style={{fontWeight: "bold"}}>{"u.location.country"}</span>
                            <span style={{color: "aqua"}}>{"u.location.city"}</span>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    </div>
}


export default Users;

