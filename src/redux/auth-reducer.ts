import {ProfileObject} from "./profile-reducer";
import {usersAPI, usersAuth} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

/*---Константы для экшена---*/
const SET_USER_DATA = "SET-USER-DATA";
const SET_AUTH_USER_PROFILE = "SET-AUTH-USER-PROFILE";


/*---Типизация иницилизационного стейта---*/
export type InitialStateAuthType = {
    userId: null | string
    login: null | string
    email: null | string
    isAuth: boolean
    profile: ProfileObject | null
}

/*---Иницилизационный стейт с начальными данными---*/
const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    profile: null
}

/*---Типизация всех использумых экшенов в редьюсере---*/
type ActionsType = SetUserDataType | SetAuthUserProfile;


export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsType): InitialStateAuthType => {
    switch (action.type) {
        case SET_USER_DATA: {
            /*---Возвращаем копию стейта, в котором заменяем наши иницилизационные данные, на входящие данные---*/
            /*---Когда данные получены, сохраняем их и меняем значение авторизован на true---*/
            return {
                ...state,
                ...action.payload
            }
        }

        case SET_AUTH_USER_PROFILE: {
            /*---Сохраняем данные своего профиля в стейт---*/
            return {...state, profile: action.profile}
        }
    }

/*---Если не один из типов не выполнен, то вернём иницилизационное значение---*/
    return state;
}



/*---Типизация экшен крейторов---*/
type SetUserDataType = ReturnType<typeof setUserData>;
type SetAuthUserProfile = ReturnType<typeof setAuthUserProfile>;

/*---Экшен крейтор, с информацией для авторизации пользователя---*/
export const setUserData = (userId: string | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {userId: userId,login: login, email: email, isAuth: isAuth}} as const
}

/*---Экшен крейтор, который вернёт данные авторизованного пользователя---*/
export const setAuthUserProfile = (profile: ProfileObject) => {
    return {type: SET_AUTH_USER_PROFILE, profile: profile} as const
}

/*---Типизация санки с запросом на авторизацию---*/
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;


/*---Санка, делающая запрос на сервер, за авторизацией, если ответ положительный, то делается ещё один запрос,
за данными авторизованного пользователя, и диспатч этих данных в стейт. Если запрос завершился неудачей, то, пока что,
ничего в ответе ничего не придёт---*/
export const authMeTC = (): ThunkType => (dispatch) => {
     return usersAuth.authMe()
        .then( (response) => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setUserData(id, login, email, true));
                usersAPI.getUserProfile(id)
                    .then(response => {
                        if (id === response.data.userId) {
                            dispatch(setAuthUserProfile(response.data));
                        }
                    })
            }
        })
}


/*---Санка, делает запрос на сервер отправляя определенные данные, чтобы залогиниться. Если данные корректные, мы выполним санку,
которая запрашивает авторизацию и профиль авторизированного пользователя, для работы с его данными(создаем кУку)---*/
export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        usersAuth.login(email, password, rememberMe)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(authMeTC());
                }
            })
    }
}


/*---Санка, делает запрос на сервер, чтобы разлогиниться. Если запрос корректен, мы выполним выполним экшен-крейтор,
который сохраняет данные о пользователе, передавая значение "null" в каждое поле, тем самым очищая всю информацию о нас(очищаем кУку)---*/
export const logoutTC = () => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        usersAuth.logout()
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false));
                }
            })
    }
}