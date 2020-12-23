import React from "react";
import styles from "./../profile.module.css";
import {InitialStatePostDateType} from "../../../redux/profileReducer";
import Post from "./post/Post";

/*---Типизация входящих пропсов для компоненты - Posts---*/
type PostsPropsType = {
    postDate: Array<InitialStatePostDateType>
    newPostText: string
    addPost: () => void
    updateNewPostText: (text: string) => void
}


const Posts = (props: PostsPropsType) => {
/*---Проходим по массиву постов из стейта и передаем в компоненту сами посты, а также информацию о лайках для постов---*/
    let postsElements = props.postDate.map(post => <Post message={post.messagePost} likeCount={post.likeCount}/>);
/*---Считываем данные из поля ввода---*/
    let addPostElement = React.createRef<HTMLTextAreaElement>();


/*---Добавление поста в стейт с массивом постов---*/
    let addNextPost = () => {
        props.addPost();
    }

/*---Отслеживание за изменением сообщения поста и сет его в стейт---*/
    let onPostChange = () => {
        if (addPostElement.current) {
            let text = addPostElement.current?.value;
            props.updateNewPostText(text);
        }
    }

/*---Отображение поля ввода для добавления постов и с кнопкой их добавления в стейт, а также отображение, всех имеющихся постов на "сервере"---*/
    return (
        <div className={styles.addNewPost}>
            <h3>Add new post:</h3>
            <div>
                <textarea onChange={onPostChange} ref={addPostElement} value={props.newPostText}/>
            </div>
            <div>
                <button onClick={addNextPost}>
                    add post
                </button>
            </div>
            <div className={styles.myNewPost}>
                {postsElements}
            </div>
        </div>
    )
}

export default Posts;