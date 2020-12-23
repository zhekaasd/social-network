import React from 'react';

import styles from "./sidebar.module.css";
import {NavLink} from "react-router-dom";
import {InitialStateItemType} from "../redux/sidebar-reducer";

/*---Типизация входящих пропсов для компоненты - Sidebar---*/
type SidebarPropsType = {
    navDate: Array<InitialStateItemType>
}

const Sidebar = (props: SidebarPropsType) => {

/*---Проходимся по массиву с данными сайдбара и изменяем url-адреса в зависимости от выбранной вкладки---*/
    let NavItem = props.navDate.map(item => <div className={styles.sideBar}>
        <NavLink to={"/" + item.to} activeClassName={styles.activeLink}>{item.title}</NavLink>
    </div>)
/*---Возвращаем список сайдбара---*/
    return <div className={styles.sideBar}>
        {NavItem}
    </div>

}

export default Sidebar;