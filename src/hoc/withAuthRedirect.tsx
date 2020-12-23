import React from 'react';
import {Redirect} from "react-router";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

/*---Типизация пропсов передаваемых в компоненту - withAuthRedirect---*/
type MapStatePropsType = {
    isAuth: boolean
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
let mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}


/*---Используем контейнерную компоненту, чтобы передавать данные в дочернюю с помощью замыкания,
это позволит нам переиспользовать эту компоненту с любой другой компонентой в коде, которую понадобится защитить редиректом---*/
export function withAuthRedirect(Component: any) {

/*---Компонента, которая возвращает нам нужную компоненту, которую мы передадим в параметрах, либо делает перенаправление на страницу 'login'---*/
    class AuthRedirectComponent extends React.Component<any, any>{

        render() {
            if (!this.props.isAuth) {
                return <Redirect to={'/login'}/>
            }

            return <Component {...this.props} />
        }
    }

/*---Оборачиваем нашу дочернюю компоненту, которая занимается редиректом или отображением нужной страницы, функцией 'connect', чтобы получить доступ к нужным нам данным из глобального стейта---*/
    let ConnectedAuthRedirectComponent = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToPropsForRedirect)(AuthRedirectComponent)
/*---Возвращаем нашу компоненту---*/
    return ConnectedAuthRedirectComponent;
}





