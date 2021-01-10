import React from "react";
import {appReducer, initializedSuccessAC, InitialStateType} from "./../redux/app-reducer";


const startState: InitialStateType = {
    initialized: false
};

it('should be initialized success is correct', function () {
    const action = initializedSuccessAC();
    const endState = appReducer(startState, action);

    expect(endState.initialized).toBe(true);
});