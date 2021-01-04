import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    getStatusUserTC,
    getUserProfileTC,
    ProfileObject,
    updateStatusUserTC
} from "../../redux/profileReducer";
import {withRouter, RouteComponentProps, Redirect} from 'react-router';
import Profile from "./Profile";
import { compose } from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


/*---Типизация передаваемых */
type ParamsType = {
    userId: string
    authorizedUserId: string
}

/*---Типизация пропсов передаваемых в компоненту - ProfileContainer---*/
type MapStateToPropsType = {
    profile: ProfileObject | null
    status: string
    authorizedUserId: string | null
}

/*---Типизация колбеков передаваемых в компоненту - ProfileContainer---*/
type MapDispatchToProps = {
    getUserProfile: (userId: string) => void
    getStatusUser: (userId: string) => void
    updateStatusUser: (status: string) => void
}

/*---Обощенная типизация данных и колбеков передаваемых в компоненту - ProfileContainer---*/
type OwnPropsType = MapStateToPropsType & MapDispatchToProps;
/*---Общая типизация компоненты, для параметров из url-адреса, и всех входящих пропсов---*/
type PropsTypes = RouteComponentProps<ParamsType> & OwnPropsType;


class ProfileContainer extends React.Component<PropsTypes, {}> {

/*---Метод жизненного цикла, который сообщает, что компонента была создана, счтывает из url-адреса данные, которые пришли
в качестве параметров, проверяет, существует ли такой пользователь, и если пользователь сущесвует, запрашивает информацию о
пользователе, его статус, контакты, имя и другую информацию---*/
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = String(Number(this.props.authorizedUserId));
/*            if (!userId) {
                this.props.history.push('/login');
            }*/
        }
        this.props.getUserProfile(userId);
        this.props.getStatusUser(userId);
    }

    render() {
/*---Прокидываем через пропсы данные дальше по компоненте---*/
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatusUser={this.props.updateStatusUser} />
            </div>
        );
    }
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId
    }
}

/*---Функция, с помощью которой мы достаем данные из url-адреса(которые указываются в качестве параметров), и прокидываем их в пропсы---*/
/*const WithUrlDataContainerComponent = withRouter(ProfileContainer);*/

/*---Оборачиваем нашу компоненту, контейнерной компонентой "connect", которая внутри сама делает диспатчи колбеков---*/
/*export default connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {
    getUserProfile: getUserProfileTC,
    getStatusUser: getStatusUserTC,
    updateStatusUser: updateStatusUserTC
})(WithUrlDataContainerComponent);*/

export default compose<any>(
    connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {getUserProfile: getUserProfileTC, getStatusUser: getStatusUserTC, updateStatusUser: updateStatusUserTC}),
    //withAuthRedirect,
    withRouter
)(ProfileContainer);