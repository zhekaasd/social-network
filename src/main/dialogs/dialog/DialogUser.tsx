import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./../dialogs.module.css";

/*---Типизация входящих пропсов для компоненты - DialogUser---*/
type  PropsType = {
    id: string
    name: string
}


/*---Компонента, возвращающая диалог с конкретным пользователем---*/
const DialogUser: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.dialogsBlock}>
            {/*---Переключение между диалогами без редиректа, с подменой url-адреса добавление id диалога ---*/}
            <NavLink to={"/dialogs/" + props.id} activeClassName={styles.activeLink}>{props.name}</NavLink>
        </div>
    )
}


export default DialogUser;