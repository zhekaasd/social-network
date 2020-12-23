import React, {ChangeEvent} from "react";
import Messages from "./messages/Messages";
import DialogUser from "./dialog/DialogUser";
import {InitialStateDialogsType} from "../../redux/dialogs-reducer";
import styles from "./dialogs.module.css";

/*---Типизация входящих пропсов для компоненты - Dialogs---*/
type DialogsPropsType = {
    // id: string
    // name: string
    // message: string
    addNewMessage: () => void
    updateMessageText: (value: string) => void //undefined?
    messagesPage: InitialStateDialogsType
}


/*---Компонента возвращающая списоб диалогов и сообщения пользвователя, сообщения пока одни и теже на все диалоги---*/
const Dialogs = (props: DialogsPropsType) => {

/*---Достаем нужную часть данных из нашего стора---*/
    let state = props.messagesPage;
/*---Достаем из стейта массив с диалогами, проходимся по нему, и отображаем диалог с конкретным пользователем, по id---*/
    let dialogItem = state.dialogDate.map( dialog =>  <DialogUser key={dialog.id} name={dialog.name} id={dialog.id} />  );
/*---Достаем из стейта массив с сообщениями, проходимся по нему, и отображаем сообщения из диалога с конкретным пользователем---*/
    let messageItem = state.messageDate.map( message => <Messages message={message.message} />);
/*---Текущее состояние впечатываемого сообщения в стейте---*/
    let newMessageText = state.messageText;



/*---Добавление сообщения в массив стейта с сообщениями---*/
    let addNewMess = () => {
        props.addNewMessage();
    }


/*---Изменение в стейте текущего состояние впечатываемого сообщения---*/
    let updateTextMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
/*---Проверяем существует ли состояние---*/
        if (event.currentTarget) {
/*---Колбек обновляющий в стейте впечатываемое сообщение---*/
            props.updateMessageText(event.currentTarget.value);
        }
    }


    return (
/*---Отображение списка диалогов---*/
        <div className={styles.dialogs}>
            <div >
                {dialogItem}
            </div>
{/*---Отображение списка сообщений с полем ввода сообщения и кнопкой добавляющий это самое сообщение в стейт---*/}
            <div className={styles.messageBlock}>
                {messageItem}
                <textarea onChange={updateTextMessage} value={newMessageText}/>
                <div><button onClick={addNewMess}>add</button></div>
            </div>
        </div>
    )
}

export default Dialogs;