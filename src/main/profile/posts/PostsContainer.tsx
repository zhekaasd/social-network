import Posts from "./Posts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {
    InitialStatePostDateType,
    addPostActionCreator,
    ProfileActionType, ProfileObjectType
} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";
import {getProfile} from "../../../redux/profile-selector";


/*---Типизация пропсов передаваемых в компоненту - Posts---*/
type MapStateToPropsType = {
    postDate: Array<InitialStatePostDateType>
    profile: ProfileObjectType | null
}

/*---Типизация колбеков передаваемых в компоненту - Posts---*/
type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}


/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postDate: state.profilePage.postData,
        profile: getProfile(state)
    }
}


/*---Прокидываем через пропсы в компоненту два колбека, по обновлению и добавлению текста поста---*/
let mapDispatchToProps = (dispatch: Dispatch<ProfileActionType>): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}


/*---Оборачиваем нашу компоненту контейнерной компонентой "connect", которая внутри сама делает диспатчи колбеков и занимается всеми sideEffects---*/
export const PostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Posts);

