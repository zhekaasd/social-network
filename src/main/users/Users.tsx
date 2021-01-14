import React from "react";
import userPhoto from "./../../assets/image/userPhoto.png"
import {InitialStateUsersItemType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import styles from "./users.module.css";
import {Paginator} from "../../common/Paginator/Paginator";
import { User } from "./User";


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

    return <div>
        <Paginator onPageChanged={props.onPageChanged} totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize} currentPage={props.currentPage} />
        {/*---Проходим по массиву пользователей и отображаем для каждого из них данные(аватар, имя, статус и тд), а также кнопку подписаться/отписаться---*/}
        {
            props.users.map( u => <div key={u.id}> <User users={u} followingInProgress={props.followingInProgress} onPageChanged={props.onPageChanged}
                                                         toggleIsFollowingProgress={props.toggleIsFollowingProgress}
                                                         follow={props.follow}
                                                         unfollow={props.unfollow}
                /> </div>
            )
        }
    </div>
}


export default Users;

