import React from "react";
import styles from "./../../profile.module.css";

/*---Типизация входящих пропсов для компоненты - Post---*/
type PostPropsType = {
    message: string
    likeCount: string
}


/*---Аватар и лайк отображения постов---*/
const Post = (props: PostPropsType) => {
    return (
        <div className={styles.avatarImg}>
            <img src="https://cs5.pikabu.ru/post_img/2014/12/05/12/1417810022_1606215082.jpg"
                 height='50px'
                 width='50px'
                 alt="asd"/>
            {props.message}
            <div className={styles.likeStats}>
                <span>like {props.likeCount}</span>
            </div>
        </div>
    )
}


export default Post;