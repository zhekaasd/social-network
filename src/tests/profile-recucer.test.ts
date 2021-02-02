import React from "react";
import profileReducer, {
    addPostActionCreator,
    deletePostAC,
    InitialStatePostPageType,
    ProfileObjectType, setStatusUserAC, setUserProfileAC
} from "../redux/profile-reducer";

const startState: InitialStatePostPageType = {
    postData: [
        {
            id: 1,
            messagePost: 'Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur. ',
            likeCount: '22'
        },

        {
            id: 2,
            messagePost: 'Lorem ipsum dolor.',
            likeCount: '6'
        },

        {
            id: 3,
            messagePost: 'Lorem ipsum Lorem ipsum dolor.',
            likeCount: '1'
        },

        {
            id: 4,
            messagePost: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi!',
            likeCount: '34'
        }
    ],
    profile: null,
    status: ''
}

it('length of posts should be incremented', function () {
    const endState = profileReducer(startState, addPostActionCreator('???????'));

    expect(endState.postData.length).toBe(5);
});

it('new post should be added', function () {
    const endState = profileReducer(startState, addPostActionCreator('???????'));

    expect(endState.postData[0].messagePost).toBe('???????');
});


it('deleting length of message should be decremented', function () {
    const endState = profileReducer(startState, deletePostAC(1));

    expect(endState.postData.length).toBe(3);
});



it(`after deleting length shouldn't be decrement if 'id' is incorrect`, function () {
    const endState = profileReducer(startState, deletePostAC(666));

    expect(endState.postData.length).toBe(4);
});


it(`set profile user is correct`, function () {
    const profileUser: ProfileObjectType = {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: 'string'
        },
        lookingForAJob: false,
        lookingForAJobDescription: 'string',
        fullName: 'My name is full name',
        userId: 111,
        photos: {
            large: 'text',
            small: 'text'
        }
    }

    const endState = profileReducer(startState, setUserProfileAC(profileUser));

    expect(endState).toBeTruthy();
});


it('status add should be correcter', function () {
    const endState = profileReducer(startState, setStatusUserAC('New status.'))

    expect(endState.status).toBeTruthy();
    expect(endState.status).toBe('New status.');
});
