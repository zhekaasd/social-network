import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profileReducer";
import usersReducer from "./users-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import {appReducer} from "./app-reducer";


/*---объединяя reducer-ы с помощью combineReducers, мы задаём структуру нашего единственного объекта-состояния(также сюда добавляем редьюсер из redux-form)---*/
let reducers = combineReducers({
    navDate: sidebarReducer,
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

/*---определить автоматически тип всего объекта состояния(типизацию для нашего стейта)---*/
export type AppStateType = ReturnType<typeof reducers>

/*---непосредственно создаём store---*/
let store = createStore(reducers, applyMiddleware(thunk));

/*---а это, чтобы можно было в консоли браузера обращаться к store в любой момент---*/
// @ts-ignore
window.store = store;

export default store;
