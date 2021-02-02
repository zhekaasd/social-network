import {ProfileObjectType} from "../../../../redux/profile-reducer";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../profileInfo.module.css";
import {creatorField, Input, Textarea} from "../../../../common/FormControl/FormControl";
import {required} from "../../../../utils/validators";


/*---Типизация компоненты - DescriptionProfileForm---*/
type DescriptionProfileFormType = {
    profile: ProfileObjectType
    deactivatedEditMode: () => void

}

/*
*
* {handleSubmit, profile, deactivatedEditMode, error}
*
* */

/*---Функция с реализацией формы---*/
export const DescriptionProfileForm: React.FC<InjectedFormProps<ProfileObjectType, DescriptionProfileFormType> & DescriptionProfileFormType> = (props) => {
    console.log(props)
    return <form onSubmit={props.handleSubmit}>
        <span className={styles.descriptionTitleInfo}>Description:</span>
        <>
        <button type="submit" style={{marginLeft: '25px'}} className={styles.editModeButton}>Save</button>
        <button type="button" onClick={props.deactivatedEditMode} className={styles.editModeButton}>Cancel</button>
        </>
        <div className={styles.descriptionInfo}>
            <span><b>My name is: </b> <i>{creatorField(Input, 'fullName', [required], '', {}, 'Your name..')}</i></span>
            <span><b>About me:</b> <i>{creatorField(Input, 'aboutMe', [required], '', {}, 'About me..')}</i></span>
            <span><b>Looking for a job:</b> <i>{creatorField(Input, 'lookingForAJob', [], '', {type: 'checkbox'}, '')}</i></span>
            <span><b>Looking for a job description:</b> <i>{creatorField(Textarea, 'lookingForAJobDescription', [required], '', {}, 'About me..')}</i></span>
        </div>
        <div className={styles.contacts}>
            <span className={styles.descriptionTitleInfo}>My links:</span>
            {/*---Создаем сепциальный объект для формы, передав туда функцую создания <Field>, которую заполним данными---*/}
            {
                Object.keys(props.profile.contacts)
                    .map(key => <div>{creatorField(Input, 'contacts.' + key, [], '', {}, key)}</div>)
            }

        </div>
        {props.error && <div className={styles.error}>{props.error}</div>}
    </form>
}

/*---Оборачиваем нашу форму HOCом из библиотеки redux-form---*/
export const DescriptionProfileFormRedux = reduxForm<ProfileObjectType, DescriptionProfileFormType>({
    form: 'description-form'
})(DescriptionProfileForm);