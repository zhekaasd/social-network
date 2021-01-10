import React from "react";
import styles from "./../profile.module.css";
import {InitialStatePostDateType} from "../../../redux/profile-reducer";
import Post from "./post/Post";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {maxLength, required} from "../../../utils/validators";

/*---Типизация входящих пропсов для компоненты - Posts---*/
type PostsPropsType = {
    postDate: Array<InitialStatePostDateType>
    addPost: (newPostText: string) => void
}


const Posts = React.memo ((props: PostsPropsType) => {
/*---Проходим по массиву постов из стейта и передаем в компоненту сами посты, а также информацию о лайках для постов---*/
    let postsElements = props.postDate.map(post => <Post message={post.messagePost} likeCount={post.likeCount}/>);


/*---Добавление поста в стейт с массивом постов---*/
    let addNextPost = (values: FormDataPostType) => {
        props.addPost(values.addPostField);
    }


/*---Отображение поля ввода для добавления постов и с кнопкой их добавления в стейт, а также отображение, всех имеющихся постов на "сервере"---*/
    return (
        <div className={styles.addNewPost}>
            <h3>Add new post:</h3>
            <PostReduxForm onSubmit={addNextPost} />
            <div className={styles.myNewPost}>
                {postsElements}
            </div>
        </div>
    )
});

export default Posts;


/*---Типизация для формы в создании поста---*/
type FormDataPostType = {
    addPostField: string
    onSubmit: () => void
}

/*---Функция-валидатор, контролирующий количество допустимых символов в поле ввода---*/
const lengthMessage = maxLength(15);


/*---Форма для добавления нового поста---*/
const PostForm: React.FC<InjectedFormProps<FormDataPostType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {/*---Специальная компонента из библиотеки redux-form, которая принивает в качестве элемента, нашу ---*/}
        <Field name={'addPostField'} component={'textarea'} validate={[required, lengthMessage]} />
        <div>
            <button>add post</button>
        </div>
    </form>
}


/*---Оборачиваем нашу форму, HOC-компонентой из redux-form, чтобы она самостоятельно выполняла все манипуляции с данными формы,
а также, "общалась" со стейтом---*/
const PostReduxForm = reduxForm<FormDataPostType>({form: 'addPostForm'})(PostForm);