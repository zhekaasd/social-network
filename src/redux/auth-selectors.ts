import {AppStateType} from "./redux-store";
import {InitialStateAuthType} from "./auth-reducer";


/*---Селектор, который "достает" значение об авторизации---*/
export const getAuthData = (state: AppStateType): InitialStateAuthType => {
    return state.auth;
}

/*---Селектор, который "достает" 'id' авторизованного пользователя---*/
export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.userId;
}