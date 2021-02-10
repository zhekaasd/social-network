import React, {ChangeEvent, useState} from 'react';
import styles from "./profileInfo.module.css";
import {ProfileObjectType} from "../../../redux/profile-reducer";
import {Preloader} from "../../../common/preloader/Preloader";
import logoAvatar from "../../../assets/image/avatar.png";
import {DescriptionStatusWithHooks} from "./status/DescriptionStatusWithHooks";
import {Redirect} from "react-router";
import {
    DescriptionProfile
} from "./description/DescriptionProfile";
import {DescriptionProfileForm, DescriptionProfileFormRedux} from "./description/DescriptionProfileForm";

/*---Типизация компоненты - ProfileInfo---*/
type ProfileInfoPropsType = {
    profile: ProfileObjectType
    status: string
    updateStatusUser: (status: string) => void
    isFetching: boolean
    isOwner: boolean
    savePhoto: (filePhoto: File) => void
    updateProfileInfo: (profile: ProfileObjectType) => any
    editModeProfile: boolean
    editModeActivated: () => void
    editModeDeactivated: () => void
}

/*---Типизация данных профайла, о контактной информации пользователя---*/
type ContactsType = {
    [key: string]: string
}


const ProfileInfo = (props: ProfileInfoPropsType) => {

    console.log(props);

/*---Переключения режима редактирования данных профиля---*/
    let [editMode, setEditMode] = useState<boolean>(false);

/*---Отображение значка прогресса загружзки, если профайла не сущесутвует---*/

    if (!props.profile) {
        return <Preloader isFetching={props.isFetching}/>
    }



/*---Обработчик достающий данные о загруженной аватарке в интуп, и отправляет их в колбек, который передаст эту
информацию на сервер---*/
    const onChangedPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            props.savePhoto(event.target.files[0])
        }
    }

/*---Включение режима редактирования профиля---*/
    const activatedEditMode = () => {
        props.editModeActivated();

    }

/*---Выход из режима редактирования профиля---*/
    const deactivatedEditMode = () => {
        props.editModeDeactivated();
    }

/*---Функция обновления данных профайла, собирающая данные из формы. После того, как функция зарезолвится, выполнить
выход из режима редактирования(это не правильный подход)---*/
    const updateProfileInfo = (formData: ProfileObjectType) => {
        props.updateProfileInfo(formData);
/*            .then( res => {
                setEditMode(false);
            })*/
    }

    return(
        <div>
{/*---Отображение аватара из профайла, если аватара нет, показываем дефолтную картинку-заглушку---*/}
            <div>
                <img src={ (props.profile.photos === null) ? logoAvatar : props.profile.photos.large } alt=""/>
                {props.isOwner && <input type="file" onChange={onChangedPhoto} />}
            </div>
{/*---Данные о пользователе из профайла(статус, общая информация, ссылки на контакты) и т.д.---*/}
            <div className={styles.description}>
    {/*---Статус---*/}
            <DescriptionStatusWithHooks status={props.status} updateStatusUser={props.updateStatusUser} />

    {/*---Основные данные о пользователе---*/}
                {
                    props.editModeProfile ? <DescriptionProfileFormRedux onSubmit={updateProfileInfo} deactivatedEditMode={deactivatedEditMode}
                                                            profile={props.profile} initialValues={props.profile} />
                    : <DescriptionProfile isOwner={props.isOwner} profile={props.profile} activatedEditMode={activatedEditMode} />
                }
            </div>
        </div>
    )
}


export default ProfileInfo;


