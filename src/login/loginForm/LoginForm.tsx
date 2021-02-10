import React from 'react';
import styles from './../login.module.css';
import stylesForm from '../../common/FormControl/formContorl.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {creatorField, Input} from '../../common/FormControl/FormControl';
import {maxLength, required} from "../../utils/validators";

/*---Типизация формы логинизации---*/
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

/*---Типизация входящих пропсов для компоненты - LoginForm---*/
type LoginFormType = {
    captchaUrl: string | null
}

/*---Функция-валидатор, контролирующий количество допустимых символов в поле---*/
const maxLengthField = maxLength(30);


/*---Форма логинизации---*/
const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormType> & LoginFormType> = (props) => {
    return <form onSubmit={props.handleSubmit} className={styles.form} >
        {/*<Field type="text" component={Input} name={'email'} validate={[required, maxLengthField]} />*/}
        {creatorField(Input, 'email', [required, maxLengthField], '', {type: 'text'}, 'login')}
        {creatorField(Input, 'password', [required, maxLengthField], '', {type: 'password'}, 'password')}
        {creatorField(Input, 'rememberMe', [], 'rememberMe', {type: 'checkbox'})}
        <div>
            <button>login</button>
        </div>
        {props.error ? <div className={stylesForm.formControl + ' ' + stylesForm.commonError}>{props.error}</div> : ''}
        {props.captchaUrl && <img src={props.captchaUrl} alt=""/>}
        {props.captchaUrl && creatorField(Input, 'captcha', [required], '', {}, 'Text from pictures..')}
    </form>
}



/*---Форма из библиотеки reduxForm, которая за нас будет делать все манипуляции с обновлением сообщений и тд,
и общаться со стором---*/
export const LoginReduxForm = reduxForm<FormDataType, LoginFormType>({form: 'login'})(LoginForm);
