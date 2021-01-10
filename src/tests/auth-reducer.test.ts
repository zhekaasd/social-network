import {
    authReducer, InitialStateAuthType, setUserData
} from "./../redux/auth-reducer";


let startState: InitialStateAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    profile: null
};


beforeEach(() => {
    startState = {
        userId: null,
        email: null,
        login: null,
        isAuth: false,
        profile: null
    }
})

it('user auth should be added is correct', function () {
    const endState = authReducer(startState, setUserData('666', 'login test','test@email.com', true));

    expect(endState).toBeTruthy();
    expect(endState.isAuth).toBe(true);
});


it('user auth should be with correct id', function () {

    const endState = authReducer(startState, setUserData('666', 'login test','test@email.com', true));

    expect(endState.userId).toBe('666');
});