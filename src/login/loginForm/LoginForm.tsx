import React from 'react';
import styles from './../login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { Input } from '../../common/FormControl/FormControl';
import {maxLength, required} from "../../utils/validators";

/*---Типизация формы логинизации---*/
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

/*---Функция-валидатор, контролирующий количество допустимых символов в поле---*/
const maxLengthField = maxLength(30);


/*---Форма логинизации---*/
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit} className={styles.form} >
        <Field type="text" component={Input} name={'email'} validate={[required, maxLengthField]} />
        <Field type="password" component={Input} name={'password'} validate={[required, maxLengthField]} />
        <div>
            <Field type="checkbox" component={Input} name={'rememberMe'} /> remember me
        </div>
        <div>
            <button>login</button>
        </div>
    </form>
}



/*---Форма из библиотеки reduxForm, которая за нас будет делать все манипуляции с обновлением сообщений и тд,
и общаться со стором---*/
export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);
