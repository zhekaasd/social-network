import Posts from "./Posts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {
    InitialStatePostDateType,
    addPostActionCreator,
    updateNewPostTextActionCreator,
    ProfileActionType
} from "../../../redux/profileReducer";
import {Dispatch} from "redux";


/*---Типизация пропсов передаваемых в компоненту - Posts---*/
type MapStateToPropsType = {
    postDate: Array<InitialStatePostDateType>
    newPostText: string
}

/*---Типизация колбеков передаваемых в компоненту - Posts---*/
type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
}


/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postDate: state.profilePage.postDate,
        newPostText: state.profilePage.newPostText
    }
}


/*---Прокидываем через пропсы в компоненту два колбека, по обновлению и добавлению текста поста---*/
let mapDispatchToProps = (dispatch: Dispatch<ProfileActionType>): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        }
    }
}


/*---Оборачиваем нашу компоненту контейнерной компонентой "connect", которая внутри сама делает диспатчи колбеков и занимается всеми sideEffects---*/
export const PostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Posts);

