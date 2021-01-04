import React from 'react';
import style from "./header.module.css";
import userLogo from "../assets/image/avatar.png"
import {NavLink} from "react-router-dom";
import {InitialStateAuthType} from "../redux/auth-reducer";

/*---Типизация компоненты - Header---*/
type HeaderPropsType = {
    authData: InitialStateAuthType
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
                        props.authData.isAuth ?
                            <div className={style.loginContainer}> <b>{props.authData.login}</b> & {props.authData.profile?.userId}
                                {props.authData.profile?.photos.small ? <img src={props.authData.profile.photos.small} alt="photo"/> : <img src={userLogo} alt="photo"/> }
                                <button onClick={props.logout}>logout</button>
                            </div>
                                : <NavLink to='/login'>Login</NavLink>
                    }
                </div>
        </div>
    )
}


export default Header;