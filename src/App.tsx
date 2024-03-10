import React from "react";
import "./index.css";

function App() {
  return (
    <div className="App">
      <header className="header">logotype</header>
      <nav className="sidebar">
        <ul>
          <li>Profile</li>
          <li>Messages</li>
          <li>News</li>
          <li>Music</li>
          <li>Settings</li>
        </ul>
      </nav>
      <main className="main"></main>
    </div>
  );
}

export default App;