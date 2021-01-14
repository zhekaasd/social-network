import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helper";

/*---Константы для экшена---*/
const FOLLOW_USER = 'sn/users-reducer/FOLLOW-USER';
const UNFOLLOW_USER = 'sn/users-reducer/UNFOLLOW-USER';
const SET_USERS = 'sn/users-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'sn/users-reducer/SET-CURRENT-PAGE';
const SET_USERS_TOTAL_COUNT = 'sn/users-reducer/SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'sn/users-reducer/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'sn/users-reducer/TOGGLE-IS-FOLLOWING-PROGRESS';

/*---Типизация подобъекта 'photos', иницилизационного объекта 'users'---*/
type InitialStateUsersItemPhotoType = {
    small: string
    large: string
}

/*---Типизация иницилизационного подобъекта 'users'---*/
export type InitialStateUsersItemType = {
    name: string
    id: number
    photos: InitialStateUsersItemPhotoType
    status: string,
    followed: boolean
}

/*---Типизация иницилизационного стейта---*/
type InitialStateUsersType = {
    users: Array<InitialStateUsersItemType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number | string>
}

/*---Иницилизационный стейт с начальными данными---*/
const initialState: InitialStateUsersType = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

/*---Типизация всех использумых экшенов в редьюсере---*/
export type UsersActionType = FollowUserActionType | UnfollowUserActionType
    | SetUsersActionType | SetCurrentPageActionType
    | SetUsersTotalCountActionType | ToggleIsFetchingActionType | ToggleIsFollowingProgressType;


const usersReducer = (state: InitialStateUsersType = initialState, action: UsersActionType): InitialStateUsersType => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, {followed: true}, 'id')
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, {followed: false}, 'id')
            }

        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter( id => id !== action.userId )
            }
        }

        default:
            return state;
    }
}


/*---Типизация экшен крейтора с подпиской на пользователя---*/
type FollowUserActionType = {
    type: typeof FOLLOW_USER
    userId: number
}

/*---Типизация экшен крейтора с отпиской на пользователя---*/
type UnfollowUserActionType = {
    type: typeof UNFOLLOW_USER
    userId: number
}

/*---Типизация экшен крейтора возвращаюшего список пользователей---*/
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<InitialStateUsersItemType>
}

/*---Типизация экшен крейтора с текущей страницей запроса---*/
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

/*---Типизация экшен крейтора возвращающий общее количесво пользователей---*/
type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    count: number
}


type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

/*---Типизация экшен крейтора делающего неактивной кнопку во время прогресса запроса---*/
type ToggleIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number | string
}


/*---Экшен крейтор, подписки на пользователя по id---*/
export const follow = (userId: number): FollowUserActionType => ({type: FOLLOW_USER, userId});

/*---Экшен крейтор, отписки от пользователя по id---*/
export const unfollow = (userId: number): UnfollowUserActionType => {
    return {type: UNFOLLOW_USER, userId}
}

/*---Экшен крейтор, запроса на сервер за всеми юзерами и сохранение этой информации в стейт---*/
export const setUsers = (users: Array<InitialStateUsersItemType>): SetUsersActionType => {
    return {type: SET_USERS, users}
}

/*---Экшен крейтор, делайющий запрос за текущей страницей с пользователя---*/
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage}
}

/*---Экшен крейтор, запрос за общим количеством юзеров на сервере---*/
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountActionType => {
    return {type: SET_USERS_TOTAL_COUNT, count: totalCount}
}

/*---Экшен крейтор с переключалкой---*/
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {type: TOGGLE_IS_FETCHING, isFetching: isFetching}
}

/*---Экшен крейтор, делающего неактивной кнопку во время прогресса запроса---*/
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number | string): ToggleIsFollowingProgressType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: isFetching, userId: userId}
}


/*---Санка, делающая запрос за списком пользователей, и диспатчащая количество общих пользователей, самих пользователей и информацию
о них---*/
export const requestUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<UsersActionType>) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsers(currentPage, pageSize);
            dispatch(toggleIsFetching(false));
            dispatch(setUsersTotalCount(response.data.totalCount))
            dispatch(setUsers(response.data.items));
}

/*---Функция, которая делает запрос за отпиской\подпиской на определенного пользователя, и активирующая "дизейбл" кнопки во время прогресса подписки\отписки---*/
const followUnfollowFlow = async (dispatch: Dispatch<UsersActionType>, userId: number, methodAPI: any, name: any) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await methodAPI(userId);
    if (response.data.resultCode === 0) {
        dispatch(name(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}


/*!---Санка, которая запускает общую функцию делающую запрос за отпиской от определенного пользователя, и активирующая "дизейбл" кнопки во время прогресса---!*/
export const unfollowTC = (userId: number) => (dispatch: Dispatch<UsersActionType>) => {
    followUnfollowFlow(dispatch, userId,  usersAPI.unfollow.bind(usersAPI), unfollow);
}

/*---Санка, которая запускает общую функцию делающую запрос за подпиской на определенного пользователя, и активирующая "дизейбл" кнопки во время прогресса---*/
export const followTC = (userId: number) => async (dispatch: Dispatch<UsersActionType>) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), follow);
}

export default usersReducer;

