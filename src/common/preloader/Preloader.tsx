import preloader from "../../assets/image/icon/2522.svg";
import React from "react";


/*---Компонента с крутилкой, отображается, когда идёт какой-то прогресс загрузки---*/
export function Preloader() {
    return <div>
        <img src={preloader} alt=""/>
    </div>
}