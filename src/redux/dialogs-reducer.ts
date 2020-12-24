
/*---Константы для экшена---*/
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';


/*---Типизация иницилизационного стейта---*/
export type InitialStateDialogsType = {
    messageDate: Array<InitialMessageDateType>
    dialogDate: Array<InitialDialogDateType>
}


/*---Типизация экшен крейторов с сообщениями диалогов---*/
type InitialMessageDateType = {
    message: string
}

/*---Типизация экшен крейторов с именами пользователей---*/
type InitialDialogDateType = {
    id: string
    name: string
}


/*---Типизация всех использумых экшенов в редьюсере---*/
export type DialogsActionType = AddNewMessageActionType;


/*---Иницилизационный стейт с начальными данными---*/
let initialState: InitialStateDialogsType = {
    messageDate: [
        {message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, voluptate!'},
        {message: 'consectetur adipisicing elit'},
        {message: 'Laborum, voluptate!'}
    ],
    dialogDate: [
        {id: '1', name: 'Vasya'},
        {id: '2', name: 'Manya'},
        {id: '3', name: 'Katya'},
        {id: '41', name: 'Katya'},
        {id: '5', name: 'Vanya'},
    ]
}


const dialogsReducer = (state = initialState, action: DialogsActionType): InitialStateDialogsType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            /*---Добавляем в уже имеющийся массив сообщений, новое сообщение---*/
            return  {
                ...state,
                messageDate: [...state.messageDate, {message: action.addMessage}]
            };

        default:
            /*---Если не один из типов не выполнен, то вернём иницилизационное значение---*/
            return state;
    }
}


/*---Типизация экшен крейторов---*/
type AddNewMessageActionType = {
    type: typeof ADD_NEW_MESSAGE
    addMessage: string
}


/*---Экшен крейтор, который добавляет новое сообщение в стейт---*/
export const addNewMessageActionCreator = (addMessage: string): AddNewMessageActionType => {
    return {type: ADD_NEW_MESSAGE, addMessage: addMessage}
};



export default dialogsReducer;