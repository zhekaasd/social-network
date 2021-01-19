import {Redirect, Route, withRouter} from "react-router-dom";
//import ProfileContainer from "./profile/ProfileContainer";
import UsersContainer from "./users/UsersContainer";
import Login from "../login/Login";
import React from "react";
import styles from "./main.module.css";
//import DialogsContainer from "./dialogs/DialogsContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {initializeAppTC} from "../redux/app-reducer";
import {Preloader} from "../common/preloader/Preloader";
import withSuspense from "../hoc/withSuspense";

const ProfileContainer = React.lazy(() => import("./profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./dialogs/DialogsContainer"));



/*---Типизация входящих пропсов компоненты - main---*/
interface IMain {
    initialized: boolean
    initializeApp: () => void
    isFetching: boolean
}

/*---Роут компонент, отоброжение компонент в зависимости от их ulr-адреса---*/
class Main extends React.PureComponent<IMain, {}> {

    /*---Метод жизненного цикла, который сообщает, что компонента была создана/вмонтирована---*/
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        /*---Если пользователь не авторизован, отображать прилоадер---*/
        if (!this.props.initialized) {
            return <Preloader isFetching={this.props.isFetching} />
        }

        return (
            <div className={styles.mainWrapper}>

                <Route path='/profile/:userId?' render={withSuspense(ProfileContainer,Preloader)}/>
{/*                <Route path='/dialogs' render={ () => <React.Suspense fallback={ <Preloader isFetching={this.props.isFetching}  /> } >
                    <DialogsContainer />
                </React.Suspense> }/>*/}
                <Route path='/dialogs' render={withSuspense(DialogsContainer,Preloader)}/>
                <Route path='/users' render={() => <UsersContainer />}/>
                <Route path='/login' render={() => <Login />}/>
            </div>
        )
    }
}

/*---Типизация пропсов передаваемых в компоненту - main---*/
type MapStateToPropsType = {
    initialized: boolean
    isFetching: boolean
}

/*---Типизация колбеков передаваемых в компоненту - main---*/
type MapDispatchToPropsType = {
    initializeApp: () => void
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
function mapStateToProps(state: AppStateType) {
    return {
        initialized: state.app.initialized,
        isFetching: state.users.isFetching,
    }
}

/*---Оборачиваем нашу иницилизационную компоненту, контейнерной, чтобы достать и прокинуть в нее нужные нам данные,
а также экспортируем предварительно обернув ее в HOC---*/
export default compose<any>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initializeApp: initializeAppTC})
)(Main);