import {AppStateType} from "./redux-store";
import {InitialStateDialogsType} from "./dialogs-reducer";


/*---Селектор, который "достает" значение об авторизации---*/
export const getMessagesData = (state: AppStateType): InitialStateDialogsType => {
    return state.dialogsPage;
}