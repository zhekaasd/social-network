import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authMeTC} from "./auth-reducer";

/*---Константы для экшена---*/
const INITIALIZED_SUCCESS = 'sn/app-reducer/INITIALIZED_SUCCESS';

/*---Типизация иницилизационного стейта---*/
export type InitialStateType = {
    initialized: boolean
}

/*---Иницилизационный стейт с начальными данными---*/
const initialState: InitialStateType = {
    initialized: false
}

/*---Общий редьюсер на всё приложение---*/
export const appReducer = (state = initialState, action: AppReducerActionsType) : InitialStateType => {
    switch (action.type) {
        /*---Экшен проверки авторизации пользователя---*/
        case INITIALIZED_SUCCESS: {
            return {
                /*---Возвращаем копию стейта, и меняем в нем значение---*/
                ...state,
                initialized: true
            }
        }

        default:
            return state;
    }
}

/*---Типизация отдельных экшенов и общих экшенов для редьюсера---*/
type AppReducerActionsType = InitializedSuccessACType;
type InitializedSuccessACType = ReturnType<typeof initializedSuccessAC>;

/*---Экшенкрейтор запрашивающий проверку авторизации пользователя---*/
export const initializedSuccessAC = () => {
    return {type: INITIALIZED_SUCCESS} as const
}

/*---Типизация отдельных входящих данных и диспатча, для санки---*/
/*
type DispatchType = Dispatch<AppReducerActionsType>;
type GetStateType = () => AppStateType;
*/


/*---Типизация санки---*/
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AppReducerActionsType>

/*---Санка, делает запрос на сервер за авторизацией, если авторизация произойдет, то санка задиспатчит экшен
и изменит значение, на авторизован, что отлючит защищающий Redirect---*/
export const initializeAppTC = (): ThunkType => {
    return async (dispatch) => {
        let resp = dispatch(authMeTC());
        dispatch(initializedSuccessAC());
    }
}