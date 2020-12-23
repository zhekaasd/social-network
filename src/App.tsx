import React from 'react';
import "./App.css"
import {BrowserRouter} from "react-router-dom";
import {SideBarContainer} from "./sidebar/SidebarContainer";
import HeaderContainer from "./header/HeaderContainer";
import {Main} from "./contentBlock/Main";


const App = () => {
  return (
      <BrowserRouter>
          <div className="WrapperApp">
            <HeaderContainer />
            <SideBarContainer />
            <Main />
          </div>
      </BrowserRouter>
  )
}

export default App;
