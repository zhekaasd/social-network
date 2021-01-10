import React from 'react';
import ProfileInfo from "./profileInfo/ProfileInfo";
import {PostsContainer} from "./posts/PostsContainer";
import {ProfileObject} from "../../redux/profile-reducer";
import styles from "./profile.module.css";

/*---Типизация компоненты - Profile---*/
type ProfilePropsType = {
    profile: ProfileObject | null //Как избавиться от "null"
    status: string
    updateStatusUser: (status: string) => void
}

/*---Компонента-посредник, которая прокидывает нужные нам данные дальше по ветке, внутри которой, есть две дочерние компоненты,
первая компонента - отображает информацию и статус пользователя, вторая - отображает и может добавлять посты на страницу профайла---*/
const Profile = (props: ProfilePropsType) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatusUser={props.updateStatusUser} />
            <PostsContainer />
        </div>
    )
}


export default Profile;