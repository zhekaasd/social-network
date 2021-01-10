import {AppStateType} from "./redux-store";

/*---Селектор, который "достает" данные о профиле пользователя---*/
export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

/*---Селектор, который "достает" статус авторизованного пользователя---*/
export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}