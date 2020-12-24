import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

/*---Константы для экшена---*/
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS_USER = 'SET-STATUS-USER';


/*---Типизация подобъекта 'photos', иницилизационного объекта---*/
type ProfilePhotosType = {
    small: string
    large: string
}

/*---Типизация отображаемых постов---*/
export type InitialStatePostDateType = {
    id: number
    messagePost: string
    likeCount: string
}

/*---Типизация подобъекта 'contacts', иницилизационного объекта---*/
export type ProfileObjectContacts = {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

/*---Типизация иницилизационного стейта---*/
export type ProfileObject = {
    aboutMe: string
    contacts: ProfileObjectContacts
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: ProfilePhotosType
    userId: number
}

/*---Типизация иницилизационного стейта---*/
type InitialStatePostPageType = {
    postDate: Array<InitialStatePostDateType>
    profile: ProfileObject | null
    status: string
}

/*---Иницилизационный стейт с начальными данными---*/
let initialState: InitialStatePostPageType = {
    postDate: [
        {
            id: 1,
            messagePost: 'Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur. ',
            likeCount: '22'
        },

        {
            id: 2,
            messagePost: 'Lorem ipsum dolor.',
            likeCount: '6'
        },

        {
            id: 3,
            messagePost: 'Lorem ipsum Lorem ipsum dolor.',
            likeCount: '1'
        },

        {
            id: 4,
            messagePost: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi!',
            likeCount: '34'
        }
    ],
    profile: null,
    status: ''
}

/*---Типизация всех использумых экшенов в редьюсере---*/
export type ProfileActionType = AddPostActionType |
    SetUserProfileActionType | SetStatusUserType;


const profileReducer = (state:InitialStatePostPageType = initialState, action: ProfileActionType): InitialStatePostPageType => {
    switch(action.type) {
        case ADD_POST:
            /*---Возвращаем копию стейта, в которой к уже имеющимся сообщениям добавляем ноовое сообщение, после чего
            зануляем текст в нашем стейте, который хранит текущее сообщение---*/
            return {
                ...state,
                postDate: [{id: 14, messagePost: action.newPostText, likeCount: '0'}, ...state.postDate]
            }

        case SET_USER_PROFILE:
            /*---Сохраняем в стейт данные профиля конкретного пользователя---*/
            return {...state, profile: action.profile}

        case SET_STATUS_USER: {
            /*---Сохраняем в стейт стутс конкретного пользователя---*/
            return {...state, status: action.status}
        }

        default:
            /*---Если не один из типов не выполнен, то вернём иницилизационное значение---*/
            return state;
    }
}


/*---Типизация экшен крейтора с добавлением статуса в стейт---*/
type SetStatusUserType = {
    type: typeof SET_STATUS_USER
    status: string
}

/*---Типизация экшен крейтора с добавлением нового поста в стейт---*/
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}


/*---Типизация экшен крейтора с сохранением данных профиля пользователя в стейт---*/
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileObject
}



/*---Экшен крейтор, добавления нового поста в стейт---*/
export const addPostActionCreator = (newPostText: string): AddPostActionType => {return {type: ADD_POST, newPostText: newPostText}};


/*---Экшен крейтор, возвращающий данные о текущем пользователе---*/
export const setUserProfileAC = (profile: ProfileObject) => {
    return { type: SET_USER_PROFILE,  profile: profile} as const
}

/*---Экшен крейтор, который возвращает данные о статусе текущего пользователя---*/
export const setStatusUserAC = (status: string): SetStatusUserType => {
    return {type: SET_STATUS_USER, status: status} as const
}


/*---Санка, делает запрос на сервер за информацией о текущем пользователе и диспатчим эту информацию в стейт---*/
export const getUserProfileTC = (userId: string) => (dispatch: Dispatch<ProfileActionType>) => {
    usersAPI.getUserProfile(userId)
        .then( (response) => {
            dispatch(setUserProfileAC(response.data))
        })
}

/*---Санка, делает запрос на сервер за статусом текущего пользователя и диспатчим эту информацию в стейт---*/
export const getStatusUserTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatusUser(userId)
        .then((response) => {
            dispatch(setStatusUserAC(response.data))
        })
}

/*---Санка, делает запрос на сервер за обновлением введенного сообщения статуса и его изменением,
и диспатч этих измениний в стейт---*/
export const updateStatusUserTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatusUser(status)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatusUserAC(status));
            }
        })
}


export default profileReducer;