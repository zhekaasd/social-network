import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

/*---Константы для экшена---*/
const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

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
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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
export const requestUsersTC = (currentPage: number, pageSize: number) => (dispatch: Dispatch<UsersActionType>) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize)
        .then( (response) => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsersTotalCount(response.data.totalCount))
            dispatch(setUsers(response.data.items));
        });
}

/*---Санка, делающая запрос за подпиской на определенного пользователя, и активирующая "дизейбл" кнопки во время прогресса---*/
export const followTC = (userId: number) => (dispatch: Dispatch<UsersActionType>) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    usersAPI.follow(userId)
        .then( (response) => {
            if (response.data.resultCode === 0) {
                dispatch(follow(userId));
            }
            dispatch(toggleIsFollowingProgress(false, userId));
        })
}

/*---Санка, делающая запрос за отпиской от определенного пользователя, и активирующая "дизейбл" кнопки во время прогресса---*/
export const unfollowTC = (userId: number) => (dispatch: Dispatch<UsersActionType>) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    usersAPI.unfollow(userId)
        .then( (response) => {
            if (response.data.resultCode === 0) {
                dispatch(unfollow(userId));
            }
            dispatch(toggleIsFollowingProgress(false, userId));
        })
}


export default usersReducer;

