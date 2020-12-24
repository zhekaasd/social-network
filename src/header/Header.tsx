import React from 'react';
import style from "./header.module.css";
import {InitialStateAuthType} from "../redux/auth-reducer";
import userLogo from "../assets/image/avatar.png"
import {NavLink} from "react-router-dom";

/*---Типизация компоненты - Header---*/
type HeaderPropsType = {
    auth: InitialStateAuthType
    logout: () => void
}

/*---Отображаем шапку сайта, в которой есть - логотип и данные о пользователе, если мы авторизованы, то покажем данные этого пользователя
с аватаркой и кнопкой 'logout'. Если мы не авторизованы, отображаем ссылку на форму логинизации---*/
const Header = (props: HeaderPropsType) => {
    return (
        <div className={style.header}>
{/*---Логотип---*/}
            <img
                src="https://image.shutterstock.com/image-vector/green-city-logo-vector-260nw-523645630.jpg"
                height='50px'
                alt="logo"/>
                <div className={style.loginBlock}>
{/*---Если не авторизованы - покажем ссылку на логин, если авторизованы - отобразим данные пользователя и его аватар---*/}
                    {
                        props.auth.isAuth ?
                            <div className={style.loginContainer}> <b>{props.auth.login}</b> & {props.auth.profile?.userId}
                                {props.auth.profile?.photos.small ? <img src={props.auth.profile.photos.small} alt="photo"/> : <img src={userLogo} alt="photo"/> }
                                <button onClick={props.logout}>logout</button>
                            </div>
                                : <NavLink to='/login'>Login</NavLink>
                    }
                </div>
        </div>
    )
}


export default Header;