import styles from "../profileInfo.module.css";
import React from "react";
import {ProfileObjectType, ProfileObjectContactsType} from "../../../../redux/profile-reducer";
import {Contacts} from "./Contacts";

/*---Типизация компоненты - DescriptionProfile---*/
type DescriptionProfileType = {
    profile: ProfileObjectType
    activatedEditMode: () => void
    isOwner: boolean
}

/*---Компонента отображает данные профиля о конкретном пользователе---*/
export const DescriptionProfile: React.FC<DescriptionProfileType> = ({profile, activatedEditMode, isOwner}) => {
    return <div className={styles.information}>

        <span className={styles.descriptionTitleInfo}>Description:</span>
        {isOwner && <button style={{marginLeft: '25px'}} onClick={activatedEditMode}>Edit</button>}
        <div className={styles.descriptionInfo}>
            <span><b>My name is: </b> <i>{profile.fullName}</i></span>
            <span><b>About me:</b> <i>{profile.aboutMe}</i></span>
            <span><b>Looking for a job:</b> <i>{profile.lookingForAJob ? "[O_O]" : "[O^O]"}</i></span>
            <span><b>Looking for a job description:</b> <i>{profile.lookingForAJobDescription}</i></span>
        </div>
        {/*---Контактная информация о пользователе---*/}
        <div className={styles.contacts}>
            <span className={styles.descriptionTitleInfo}>My links:</span>
            {/*--- Создаем сепциальный объект, который достает из нужного нам объекта ключи и из этих данныех создает
            массив ключей и значений, которые мы передаем в компоненту ---*/}
            {
                Object.keys(profile.contacts).map( key => <Contacts key={key} nameLink={key} valueLink={profile.contacts[key as keyof ProfileObjectContactsType]} /> )
            }
        </div>
    </div>
}

