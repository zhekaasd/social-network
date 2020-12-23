
//НЕ ИСПОЛЬЗУЕТСЯ


import React from "react";


/*
type PostDateType = {
    id: number
    messagePost: string
    likeCount: string
}

type PostPageType = {
    postDate: Array<PostDateType>
    newPostText: string
}

type MessageDateType = {
    message: string
}

type DialogDateType = {
    id: string
    name: string
}

type MessagesPage = {
    messageDate: Array<MessageDateType>
    dialogDate: Array<DialogDateType>
    messageText: string
}

type NavDateItemType = {
    to: string
    title: string
    id: number
}

type NavDateType = {
    navDate: Array<NavDateItemType>
}



let store = {
    _state: {
        navDate: [
            {to: 'profile', title: 'Profile', id: 1},
            {to: 'dialogs', title: 'Message', id: 2},
            {to: 'music', title: 'Music', id: 3},
            {to: 'news', title: 'News', id: 4},
            {to: 'settings', title: 'Settings', id: 5},
        ],

        messagesPage: {
            messageDate: [
                {message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, voluptate!'},
                {message: 'consectetur adipisicing elit'},
                {message: 'Laborum, voluptate!'}
            ],
            dialogDate: [
                {id: '1', name: 'Vasya'},
                {id: '2', name: 'Manya'},
                {id: '3', name: 'Katya'},
                {id: '41', name: 'Katya'},
                {id: '5', name: 'Vanya'},
            ],
            messageText: ''
        },

        profilePage: {
            postDate: [
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
            newPostText: ''
        }

    },

    _callSubscriber() {
        console.log('State ch');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._callSubscriber(this._state);
    }
}


window.this = store;н

 */