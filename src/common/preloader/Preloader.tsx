import preloader from "../../assets/image/icon/2522.svg";
import React from "react";

type PreloaderType = {
    isFetching: boolean
}

/*---Компонента с крутилкой, отображается, когда идёт какой-то прогресс загрузки---*/
export const Preloader: React.FC<PreloaderType> = (props) => {
    return props.isFetching ? <div> <img src={preloader} alt=""/> </div> : null;
}