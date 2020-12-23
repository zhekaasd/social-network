import React from "react";
import styles from "../dialogs.module.css";

// const className: string = style.ItemMessage;

/*---Типизация входящих пропсов для компоненты - Messages---*/
type PropsType = {
    message: string
}


/*---Компонентна возвращающая список сообщений в диалоге---*/
const Messages: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.itemMessage}>
            {props.message}
        </div>

    )
}

export default Messages;