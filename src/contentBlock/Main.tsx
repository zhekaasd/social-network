import {Route} from "react-router-dom";
import ProfileContainer from "./profile/ProfileContainer";
import UsersContainer from "./users/UsersContainer";
import Login from "../login/Login";
import React from "react";
import styles from "./main.module.css";
import DialogsContainer from "./dialogs/DialogsContainer";

/*---Роут компонент, отоброжение компонент в зависимости от их ulr-адреса---*/
export function Main() {
    return (
        <div className={styles.mainWrapper}>
            <Route path='/profile/:userId?' render={() => <ProfileContainer/>} />
            <Route path='/dialogs' render={() => <DialogsContainer/>} />
            <Route path='/users' render={() => <UsersContainer/>} />
            <Route path='/login' render={() => <Login/>} />
        </div>
    )
}