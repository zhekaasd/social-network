import React from 'react';
import Header from "./Header";
import axios from "axios";
import {authMeTC, InitialStateAuthType, setAuthUserProfile, setUserData} from "../redux/auth-reducer";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {ProfileObject} from "../redux/profileReducer";
import {usersAPI, usersAuth} from "../api/api";


/*---Типизация классовой компоненты---*/
interface IHeaderContainer {
    authMe: () => void
    auth: InitialStateAuthType
}

/*---Типизация пропсов передаваемых в компоненту - HeaderContainer---*/
type MapStatePropsType = {
    auth: InitialStateAuthType
};

/*---Типизация колбеков передаваемых в компоненту - HeaderContainer---*/
type MapDispatchPropsType = {
    authMe: () => void
};


class HeaderContainer extends React.Component<IHeaderContainer, {}> {

/*---Метод жизненного цикла, который сообщает, что компонента была создана/вмонтирована---*/
    componentDidMount() {
        this.props.authMe();
    }

    render() {
        return <Header {...this.props} auth={this.props.auth} />
    }
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
function mapStateToProps(state: AppStateType) {
    return {
        auth: state.auth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    authMe: authMeTC
})(HeaderContainer);