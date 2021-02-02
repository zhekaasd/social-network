import React from 'react';
import ProfileInfo from "./profileInfo/ProfileInfo";
import {PostsContainer} from "./posts/PostsContainer";
import {ProfileObjectType} from "../../redux/profile-reducer";
import styles from "./profile.module.css";
import {Preloader} from "../../common/preloader/Preloader";

/*---Типизация компоненты - Profile---*/
type ProfilePropsType = {
    profile: ProfileObjectType | null //Как избавиться от "null"
    status: string
    updateStatusUser: (status: string) => void
    isFetching: boolean
    isOwner: boolean
    savePhoto: (filePhoto: File) => void
    updateProfileInfo: (profile: ProfileObjectType) => Promise<any>
}

/*---Компонента-посредник, которая прокидывает нужные нам данные дальше по ветке, внутри которой, есть две дочерние компоненты,
первая компонента - отображает информацию и статус пользователя, вторая - отображает и может добавлять посты на страницу профайла---*/
const Profile = (props: ProfilePropsType) => {

       if (!props.profile) {
        return <Preloader isFetching={props.isFetching}/>
    }

    return (
        <div className={styles.profile}>
            <ProfileInfo updateProfileInfo={props.updateProfileInfo} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatusUser={props.updateStatusUser} isFetching={props.isFetching} />
            <PostsContainer />
        </div>
    )
}


export default Profile;