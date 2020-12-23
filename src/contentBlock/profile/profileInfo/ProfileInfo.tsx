import React from 'react';
import styles from "./profileInfo.module.css";
import {ProfileObject} from "../../../redux/profileReducer";
import {Preloader} from "../../../components/preloader/Preloader";
import logoAvatar from "../../../assets/image/userPhoto.png";
import {DescriptionStatus} from "./status/Status";

/*---Типизация компоненты - ProfileInfo---*/
type ProfileInfoPropsType = {
    profile: ProfileObject | null
    status: string
    updateStatusUser: (status: string) => void
}

/*---Типизация данных профайла, о контактной информации пользователя---*/
type ContactsType = {
    [key: string]: string
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
/*---Отображение значка прогресса загружзки, если профайла не сущесутвует---*/
    if (!props.profile) {
        return <Preloader/>
    }

/*---Достаем данные пришедшие с сервера и закидываем в массив---*/
    let contacts: ContactsType = props.profile.contacts;
    let linkInfo = [];

    for (let key in contacts) {
        if (contacts[key] !== null) {
            linkInfo.push({nameLink: key, yourInfo: contacts[key]});
        } else {
            linkInfo.push({nameLink: key, yourInfo: '---'});
        }
    }


    return(
        <div>
{/*---Отображение аватара из профайла, если аватара нет, показываем дефолтную картинку-заглушку---*/}
            <div>
                <img src={ (props.profile.photos.large === null || props.profile.photos.small === null) ? logoAvatar : props.profile.photos.large } alt=""/>
            </div>
{/*---Данные о пользователе из профайла(статус, общая информация, ссылки на контакты) и т.д.---*/}
            <div className={styles.description}>
    {/*---Статус---*/}
                <div className={styles.status}>
                    <span className={styles.descriptionTitleInfo}>Status: </span>
                    <DescriptionStatus status={props.status} updateStatusUser={props.updateStatusUser} />
                </div>
    {/*---Основные данные о пользователе---*/}
                <div className={styles.information}>
                    <span className={styles.descriptionTitleInfo}>Description:</span>
                    <div className={styles.descriptionInfo}>
                        <span><b>My name is: </b> <i>{props.profile.fullName}</i></span>
                        <span><b>About me:</b> <i>{props.profile.aboutMe}</i></span>
                        <span><b>Looking for a job:</b> <i>{props.profile.lookingForAJob}</i></span>
                        <span><b>Looking for a job description:</b> <i>{props.profile.lookingForAJobDescription}</i></span>
                    </div>
                </div>
    {/*---Контактная информация о пользователе---*/}
                <div className={styles.contacts}>
                    <span className={styles.descriptionTitleInfo}>My links:</span>
                    {
                        linkInfo.map( l => <div> <b>{l.nameLink}: </b> <i>{l.yourInfo}</i> </div>)
                    }
                </div>
            </div>
        </div>
    )
}


export default ProfileInfo;


