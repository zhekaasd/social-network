import React from "react";
import dialogsReducer, {
    addNewMessageActionCreator,
    deleteMessageAC,
    InitialStateDialogsType
} from "../redux/dialogs-reducer";

const startState: InitialStateDialogsType = {
    messageData: [
        {id: 1, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, voluptate!'},
        {id: 2, message: 'consectetur adipisicing elit'},
        {id: 3, message: 'Laborum, voluptate!'}
    ],
    dialogData: [
        {id: '1', name: 'Vasya'},
        {id: '2', name: 'Manya'},
        {id: '3', name: 'Katya'},
        {id: '41', name: 'Katya'},
        {id: '5', name: 'Vanya'},
    ]
}

it('should length of message should be incremented', function () {
    const endState = dialogsReducer(startState, addNewMessageActionCreator('New message!!!'));

    expect(endState.messageData.length).toBe(4);
});

it('new message should be added', function () {
    const endState = dialogsReducer(startState, addNewMessageActionCreator('New message!!!'));


    expect(endState.messageData[3].message).toBe('New message!!!');
});

it('deleting length of message should be decremented', function () {
    const endState = dialogsReducer(startState, deleteMessageAC(2));

    expect(endState.messageData.length).toBe(2);
});

it(`after deleting length shouldn't be decrement if 'id' is incorrect`, function () {
    const endState = dialogsReducer(startState, deleteMessageAC(666));

    expect(endState.messageData.length).toBe(3);
});

