import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <a href="#">
            <img className="logoImg"></img>
          </a>
          <img className="d-m-n loginImg"></img>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
