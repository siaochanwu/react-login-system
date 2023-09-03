import "bootstrap/scss/bootstrap.scss";
import Register from "./views/Register";
import Login from "./views/Login";
import Todo from "./views/Todo";
import "./App.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, NavLink, Routes, Route } from "react-router-dom";
import Auth from "./views/Auth";

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="register" element={<Register />} />
            <Route path="" element={<Login />} />
          </Route>
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
