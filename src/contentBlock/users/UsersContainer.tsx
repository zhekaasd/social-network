import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followTC,
    getUsersTC,
    InitialStateUsersItemType,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollowTC,
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../../components/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


/*---Типизация пропсов передаваемых в компоненту - UsersContainer---*/
type MapStateToPropsType = {
    users: Array<InitialStateUsersItemType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number | string>
    isAuth: boolean
}

/*---Типизация колбеков передаваемых в  компоненту - UsersContainer---*/
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number | string) => void
    getUsers: (pageNumber: number, pageSize: number) => void
}


/*---Достаем нужную для компоненты часть данных из глобального стора---*/
let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress,
        isAuth: state.auth.isAuth
    }
}


/*---Типизация компоненты---*/
interface IUsersPropsType {
    users: Array<InitialStateUsersItemType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number | string) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number | string>
    getUsers: (currentPage: number, pageSize: number) => void
    isAuth: boolean
}


class UsersContainer extends React.Component<IUsersPropsType, {}> {

/*---Метод жизненного цикла(вмонтирования компоненты), в который приходит санка, с запросом на сервер за списком пользователей,
где в качестве параметров передаются номер страницы и кол-во пользвователей указанные в стейте по умолчанию(по умолчанию currentPage = 1, pageSize = 15)---*/
    componentDidMount = () => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }


/*---Метод, переключения меджу страницами запрашиваемых пользователей---*/
    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
    }


    render() {
/*---Пока данные не будут загружены, будет отобраэаться прогресс загрузки, когда все данные загрузятся, ототбразится список поьлзователей---*/
        return <>
            { this.props.isFetching ? <Preloader /> : <Users
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                totalUsersCount={this.props.totalUsersCount}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            /> }

        </>
    }
}

/*---Фунция выполняющая редирект на страницу логина и не позволяющая нам зайти на страницу с диалогами, если мы не будем авторизованы---*/
/*let AuthRedirectComponent = withAuthRedirect(UsersContainer);*/

/*---Оборачиваем нашу компоненту, которая делает редирект, контейнерной компонентой "connect", которая внутри сама делает диспатчи колбеков и занимается всеми sideEffects---*/
/*export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    follow: followTC,
    unfollow: unfollowTC,
    setCurrentPage,
    toggleIsFollowingProgress,
    getUsers: getUsersTC
})(AuthRedirectComponent);*/


export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        follow: followTC,
        unfollow: unfollowTC,
        setCurrentPage,
        toggleIsFollowingProgress,
        getUsers: getUsersTC
    }),
    withAuthRedirect
)(UsersContainer);
