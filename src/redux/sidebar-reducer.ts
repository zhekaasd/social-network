
/*---Типизация иницилизационного стейта---*/
export type InitialStateItemType = {
    to: string
    title: string
    id: number
}


/*---Иницилизационный стейт с начальными данными---*/
let initialState: Array<InitialStateItemType> = [
        {to: 'profile', title: 'Profile', id: 1},
        {to: 'dialogs', title: 'Message', id: 2},
        {to: 'music', title: 'Music', id: 3},
        {to: 'news', title: 'News', id: 4},
        {to: 'settings', title: 'Settings', id: 5},
        {to: 'users', title: 'Find users', id: 6},
    ]
;


const sidebarReducer = (state: Array<InitialStateItemType> = initialState, action: any): Array<InitialStateItemType> => {

/*---Если не один из типов не выполнен, то вернём иницилизационное значение---*/
    return state;
}


export default sidebarReducer;


