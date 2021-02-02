import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    getStatusUserTC,
    getUserProfileTC,
    ProfileObjectType, savePhotoTC, updateProfileInfoTC,
    updateStatusUserTC
} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps, Redirect} from 'react-router';
import Profile from "./Profile";
import { compose } from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Preloader} from "../../common/preloader/Preloader";
import {getProfile, getStatus} from "../../redux/profile-selector";
import {getAuthorizedUserId} from "../../redux/auth-selectors";


/*---Типизация передаваемых */
type ParamsType = {
    userId: string
    authorizedUserId: string
}

/*---Типизация пропсов передаваемых в компоненту - ProfileContainer---*/
type MapStateToPropsType = {
    profile: ProfileObjectType | null
    status: string
    authorizedUserId: number | null
    isFetching: boolean
}

/*type MapPropsType = ReturnType<typeof mapStateToProps>;*/

/*---Типизация колбеков передаваемых в компоненту - ProfileContainer---*/
type MapDispatchToProps = {
    getUserProfile: (userId: number) => void
    getStatusUser: (userId: number) => void
    updateStatusUser: (status: string) => void
    savePhoto: (filePhoto: File) => void
    updateProfileInfo: (profile: ProfileObjectType) => any
}

/*---Обощенная типизация данных и колбеков передаваемых в компоненту - ProfileContainer---*/
type OwnPropsType = MapStateToPropsType & MapDispatchToProps;
/*---Общая типизация компоненты, для параметров из url-адреса, и всех входящих пропсов---*/
type PropsTypes = RouteComponentProps<ParamsType> & OwnPropsType;


class ProfileContainer extends React.Component<PropsTypes, {}> {

    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId as number);
        this.props.getStatusUser(userId as number);
    }

/*---Метод жизненного цикла, который сообщает, что компонента была создана, счтывает из url-адреса данные, которые пришли
в качестве параметров, проверяет, существует ли такой пользователь, и если пользователь сущесвует, запрашивает информацию о
пользователе, его статус, контакты, имя и другую информацию---*/
    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<PropsTypes>, prevState: Readonly<PropsTypes>): void {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }


    render() {

/*---Прокидываем через пропсы данные дальше по компоненте---*/
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} isFetching={this.props.isFetching}
                         status={this.props.status} updateStatusUser={this.props.updateStatusUser}
                         isOwner={!this.props.match.params.userId}
                         updateProfileInfo={this.props.updateProfileInfo}
                />
            </div>
        );
    }
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        authorizedUserId: getAuthorizedUserId(state),
        isFetching: state.users.isFetching
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
    connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {
        getUserProfile: getUserProfileTC,
        getStatusUser: getStatusUserTC,
        updateStatusUser: updateStatusUserTC,
        savePhoto: savePhotoTC,
        updateProfileInfo: updateProfileInfoTC
    }),
    withAuthRedirect,
    withRouter
)(ProfileContainer);