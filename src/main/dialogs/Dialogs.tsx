import React, {ChangeEvent} from "react";
import Messages from "./messages/Messages";
import DialogUser from "./dialog/DialogUser";
import {InitialStateDialogsType} from "../../redux/dialogs-reducer";
import styles from "./dialogs.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators";
import {creatorField, Textarea} from "../../common/FormControl/FormControl";

/*---Типизация входящих пропсов для компоненты - Dialogs---*/
type DialogsPropsType = {
    // id: string
    // name: string
    // message: string
    addNewMessage: (addMessage: string) => void
    dialogsData: InitialStateDialogsType
}


/*---Компонента возвращающая списоб диалогов и сообщения пользвователя, сообщения пока одни и теже на все диалоги---*/
const Dialogs = (props: DialogsPropsType) => {

/*---Достаем нужную часть данных из нашего стора---*/
    let state = props.dialogsData;
/*---Достаем из стейта массив с диалогами, проходимся по нему, и отображаем диалог с конкретным пользователем, по id---*/
    let dialogItem = state.dialogData.map(dialog =>  <DialogUser key={dialog.id} name={dialog.name} id={dialog.id} />  );
/*---Достаем из стейта массив с сообщениями, проходимся по нему, и отображаем сообщения из диалога с конкретным пользователем---*/
    let messageItem = state.messageData.map(message => <Messages message={message.message} />);



/*---Добавление сообщения в массив стейта с сообщениями---*/
    let addNewMess = (values: DataAddMessageDialogFormType) => {
        props.addNewMessage(values.addDialogMessage);
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
                <DialogReduxForm onSubmit={addNewMess} />
            </div>
        </div>
    )
}

export default Dialogs;

/*---Типизация для формы в диалогах---*/
type DataAddMessageDialogFormType = {
    addDialogMessage: string
}

/*---Функция-валидатор, контролирующий количество допустимых символов в поле ввода---*/
const lengthMessage = maxLength(15);

/*---Форма для диалогов---*/
const AddMessageDialogForm: React.FC<InjectedFormProps<DataAddMessageDialogFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {/*---Специальная компонента из библиотеки redux-form, которая самостоятельно контролирует все манипуляции с элементом, и общается со стейтом---*/}
        {/*<Field component={Textarea} name={'addDialogMessage'} validate={[required, lengthMessage]} />*/}
        {creatorField(Textarea, 'addDialogMessage', [required, lengthMessage], '', {}, 'Your message...')}
        <div>
            <button>add</button>
        </div>
    </form>
}

/*---Оборачиваем нашу форму, HOC-компонентой из redux-form, чтобы она самостоятельно выполняла все манипуляции с данными формы,
а также, "общалась" со стейтом---*/
const DialogReduxForm = reduxForm<DataAddMessageDialogFormType>({form: 'dialogMessageForm'})(AddMessageDialogForm);