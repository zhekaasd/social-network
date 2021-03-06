import React from "react";
import styles from "./../../profile.module.css";
import avatar from "../../../../assets/image/avatar.png"
import {ProfileObjectType} from "../../../../redux/profile-reducer";

/*---Типизация входящих пропсов для компоненты - Post---*/
type PostPropsType = {
    message: string
    likeCount: string
    profile: ProfileObjectType | null
}


/*---Аватар и лайк отображения постов---*/
const Post = (props: PostPropsType) => {
    return (
        <div className={styles.avatarImg}>
            <img src={props.profile ? props.profile.photos.small : avatar}
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