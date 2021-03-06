import React from 'react';
import {FormDataType, LoginReduxForm} from "./loginForm/LoginForm";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {loginTC} from "../redux/auth-reducer";
import {Redirect} from "react-router";
import {getIsAuth} from "../redux/users-selectors";


/*---Типизация входящих пропсов для компоненты - Login---*/
type LoginType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
    isAuth: boolean
    captchaUrl: string | null
}

/*---Компонента с формой логинизации---*/
const Login: React.FC<LoginType> = React.memo ((props) => {

/*---Если мы авторизованы, то нас перекинет на страницу профиля---*/
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

/*---Делаем логинизацию с отправкой данных на сервер---*/
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    );
});




/*---Типизация колбеков передаваемых в компоненту - Login---*/
type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}

/*---Типизация пропсов передаваемых в компоненту - Login---*/
type mapStateToProps = {
    isAuth: boolean
    captchaUrl: string | null
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: getIsAuth(state),
        captchaUrl: state.auth.captchaUrl
    }
}

/*---Оборачиваем нашу компонентку "коннектом", которая нам вернёт уже задиспатченный колбек, который мы можем использовать---*/
export default connect<mapStateToProps, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {login: loginTC})(Login);