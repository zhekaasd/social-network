
/*---Константы для экшена---*/
const ADD_NEW_MESSAGE = 'sn/dialogs-reducer/ADD-NEW-MESSAGE';
const DELETE_MESSAGE = 'sn/dialogs-reducer/DELETE-MESSAGE';


/*---Типизация иницилизационного стейта---*/
export type InitialStateDialogsType = {
    messageData: Array<InitialMessageDateType>
    dialogData: Array<InitialDialogDateType>
}


/*---Типизация экшен крейторов с сообщениями диалогов---*/
type InitialMessageDateType = {
    id: number
    message: string
}

/*---Типизация экшен крейторов с именами пользователей---*/
type InitialDialogDateType = {
    id: string
    name: string
}


/*---Типизация всех использумых экшенов в редьюсере---*/
export type DialogsActionType = AddNewMessageActionType | DeleteMessageType;


/*---Иницилизационный стейт с начальными данными---*/
let initialState: InitialStateDialogsType = {
    messageData: [
        {id: 1, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, voluptate!'},
        {id: 2, message: 'consectetur adipisicing elit'},
        {id: 3, message: 'Laborum, voluptate!'}
    ],
    dialogData: [
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
                messageData: [...state.messageData, {message: action.addMessage, id: 666}]
            };
        /*---Возвращаем копию нашего стейта, и делаем фильтрацию, и возвращаем новый массив со всеми сообщениями,
        кроме сообщения с id, которое совпадает с id из экшена---*/
        case DELETE_MESSAGE: {
            return {
                ...state,
                messageData: state.messageData.filter(m => m.id !== action.id)
            }
        }

        default:
            /*---Если не один из типов не выполнен, то вернём иницилизационное значение---*/
            return state;
    }
}


/*---Типизация экшен крейторов---*/
type AddNewMessageActionType = { type: typeof ADD_NEW_MESSAGE, addMessage: string }
type DeleteMessageType = ReturnType<typeof deleteMessageAC>;

/*---Экшен крейтор, который добавляет новое сообщение в стейт---*/
export const addNewMessageActionCreator = (addMessage: string): AddNewMessageActionType => {
    return {type: ADD_NEW_MESSAGE, addMessage: addMessage}
};

/*---Экшен крейтор, который удаляет текущее сообщение из стейта---*/
export const deleteMessageAC = (id: number) => {
    return {type: DELETE_MESSAGE, id} as const
}



export default dialogsReducer;