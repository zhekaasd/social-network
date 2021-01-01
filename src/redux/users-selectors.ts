import {AppStateType} from "./redux-store";
import {InitialStateUsersItemType} from "./users-reducer";



/*---Селектор, который "достает" юзеров из стейта---*/
export const getUsers = (state: AppStateType): Array<InitialStateUsersItemType> => {
    return state.users.users;
}


/*---Селектор, который "достает" значение количества пользователей на странице из стейта---*/
export const getPageSize = (state: AppStateType): number => {
    return state.users.pageSize;
}


/*---Селектор, который "достает" общее количество юзеров на сервере из стейта---*/
export const getTotalUsersCount = (state: AppStateType): number => {
    return state.users.totalUsersCount;
}


/*---Селектор, который "достает" значение текущей страницы с пользователями из стейта---*/
export const getCurrentPage = (state: AppStateType): number => {
    return state.users.currentPage;
}


/*---Селектор, который "достает" текущее значение из стейта---*/
export const getIsFetching = (state: AppStateType): boolean => {
    return state.users.isFetching;
}


/*---???---*/
export const getFollowingInProgress = (state: AppStateType): Array<number | string> => {
    return state.users.followingInProgress;
}


/*---Селектор, который "достает" текущее значение о статусе авторизации из стейта---*/
export const getIsAuth = (state: AppStateType): boolean => {
    return state.auth.isAuth;
}

