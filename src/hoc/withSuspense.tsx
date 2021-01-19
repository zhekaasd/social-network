import React from "react";
import {compose} from "redux";
import { connect } from "react-redux";
import {AppStateType} from "../redux/redux-store";



/*---HOC-компонента, которая оборачивает функции в обертку, использвующую "Suspense" для ленивой загрузки---*/
const withSuspense = (Component: any, Component1: any) => {
    return (props: any) => <React.Suspense fallback={ <Component1 {...props} /> }>
        <Component {...props} />
    </React.Suspense>

}

export default withSuspense;