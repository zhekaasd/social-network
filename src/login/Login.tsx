import React from 'react';
import {FormDataType, LoginReduxForm} from "./loginForm/LoginForm";




/*---Компонента с формой логинизации---*/
function Login() {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
}

export default Login;