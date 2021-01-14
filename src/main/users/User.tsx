import styles from "./users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/image/userPhoto.png";
import React from "react";
import {InitialStateUsersItemType} from "../../redux/users-reducer";



/*---Типизация компоненты - User---*/
type UserPropsType = {
    users: InitialStateUsersItemType
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number | string) => void
    followingInProgress: Array<number | string>
}


export const User: React.FC<UserPropsType> = (props) => {
    return <div className={styles.userData}>
        {/*---Отображаем список пользователей с аватаром и кнопкой подписаться---*/}
        <div className={styles.userAvatarButton}>
            {/*---Делаем переходим на страницу отдельно взятого пользователя кликнув по его аватару---*/}
            <NavLink to={'/profile/'+ props.users.id}>
                <img src={props.users.photos.small != null ? props.users.photos.small : userPhoto} alt="asd" width={'100px'}/>
            </NavLink>
            {/*---Отображаем нужну кнопку в зависимости от данных с сервера о подписке, если не подписаны - "подписаться", если подписаны - "отписаться"---*/}
            {props.users.followed ?
                /*---Делаем кнопку подписаться/отписаться НЕАКТИВНОЙ пока выполняется запрос, если она была единожды нажата---*/
                /*---По клику на кнопку, запускаем колбек, который запустит санку с запросом на сервер о подписке и переведёт кнопку в другое положение---*/
                <button disabled={props.followingInProgress.some(id => id === props.users.id)} onClick={() => {props.unfollow(props.users.id)}}>unfollow</button>
                : <button disabled={props.followingInProgress.some(id => id === props.users.id)} onClick={() => {props.follow(props.users.id)}}>follow</button>
            }
        </div>
        {/*---Отображаем имя и статус пользователя, и немного информации---*/}
        <div className={styles.description}>
            {/*---Отображаем имя пользователя и статус пользователя---*/}
            <div className={styles.descriptionInformation}>
                <span style={{fontWeight: "bold"}}>{props.users.name}</span>
                {props.users.status === null ? '' : <span style={{color: 'lightblue'}}>"{props.users.status}"</span>}
            </div>
            {/*---Отображаем страну и город пользователя---*/}
            <div className={styles.descriptionLocation}>
                <span style={{fontWeight: "bold"}}>{"props.users.location.country"}</span>
                <span style={{color: "aqua"}}>{"props.users.location.city"}</span>
            </div>
        </div>
    </div>
}