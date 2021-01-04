import {
    addNewMessageActionCreator,
    InitialStateDialogsType,
    DialogsActionType
} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


/*---Типизация пропсов передаваемых в компоненту - Dialogs---*/
type MapStatePropsType = {
    dialogsData: InitialStateDialogsType
}

/*---Типизация колбеков передаваемых в компоненту - Dialogs---*/
type MapDispatchPropsType = {
    addNewMessage: (addMessage: string) => void
}

/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsData: state.dialogsPage
    }
}

/*---Прокидываем через пропсы в компоненту два колбека, по обновлению и добавлению текста в сообщения---*/
let mapDispatchToProps = (dispatch: Dispatch<DialogsActionType>): MapDispatchPropsType => {
    return {
        /*---Добавляем\отправляем сообщение в главный стейт---*/
        addNewMessage: (addMessage: string) => {
            dispatch(addNewMessageActionCreator(addMessage));
        }
    }
}

/*---Функция композ, собирает все наши функции-обёртки в одном метсе, и вызывает их самостоятельно,
нам нужно лишь указать правильный порядок обёртывания нашей целевой компоненты,
целевая компонента идёт во второй вызов функции композ, а в первый вызов добавляются все функции-обёртки---*/
export default compose<any>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

/*---Фунция выполняющая редирект на страницу логина и не позволяющая нам зайти на страницу с диалогами, если мы не будем авторизованы---*/
let AuthRedirectComponent = withAuthRedirect(Dialogs);

/*---Оборачиваем нашу компоненту, которая делает редирект, контейнерной компонентой "connect", которая внутри сама делает диспатчи колбеков и остальное---*/
//export const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Dialogs);