import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import { InitialStateItemType } from "../redux/sidebar-reducer";
import Sidebar from "./Sidebar";


/*---Типизация пропсов передаваемых в компоненту - Sidebar---*/
type MapStatePropsType = {
    navDate: Array<InitialStateItemType>
}



/*---Прокидываем через пропсы в компоненту нужную нам часть данных из стейта---*/
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        navDate: state.navDate
    }
}


/*---Оборачиваем нашу компоненту, которая делает редирект, контейнерной компонентой "connect", которая внутри сама делает диспатчи колбеков и остальное---*/
export const SideBarContainer = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(Sidebar);

