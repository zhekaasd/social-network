import React from 'react';
import Header from "./Header";
import {InitialStateAuthType, logoutTC} from "../redux/auth-reducer";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {getAuthData} from '../redux/auth-selectors';


/*---Типизация классовой компоненты---*/
interface IHeaderContainer {
    authData: InitialStateAuthType
    logout: () => void
}

/*---Типизация пропсов передаваемых в компоненту - HeaderContainer---*/
type MapStatePropsType = {
    authData: InitialStateAuthType
};

/*---Типизация колбеков передаваемых в компоненту - HeaderContainer---*/
type MapDispatchPropsType = {
    logout: () => void
};




class HeaderContainer extends React.Component<IHeaderContainer, {}> {

    render() {
        return <Header {...this.props} authData={this.props.authData} />
    }
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
function mapStateToProps(state: AppStateType) {
    return {
        authData: getAuthData(state)
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {logout: logoutTC})(HeaderContainer);