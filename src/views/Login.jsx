import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;

const inputList = [
  {
    name: "email",
    id: "email",
    title: "Email",
    type: "text",
    placeholder: "請輸入 email",
  },
  {
    name: "password",
    id: "password",
    title: "密碼",
    type: "password",
    placeholder: "請輸入密碼",
  },
];

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMSG, setErrorMSG] = useState("");

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignin = () => {
    (async () => {
      try {
        const { data } = await axios.post(
          `${VITE_APP_HOST}/users/sign_in`,
          form
        );
        console.log(data);
        if (data.status) {
          const { token } = data;
          document.cookie = `token=${token};`;
          navigate("/todo");
        } else {
          setErrorMSG(data.message)
        }
      } catch (err) {
        console.log(err.response.data.message);
        setErrorMSG(err.response.data.message);
      }
    })();
  };

  return (
    <form className="formControls" action="index.html">
      <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
      {inputList.map((item) => (
        <div key={item.id}>
          <label className="formControls" htmlFor={item.name}>
            {item.title}
          </label>
          <input
            type={item.id}
            name={item.name}
            id={item.id}
            placeholder={item.placeholder}
            className="formControls_input"
            onChange={handleInput}
            required
          ></input>
        </div>
      ))}

      <p id="err" className="text-danger">
        {errorMSG}
      </p>

      <input
        className="formControls_btnSubmit pe-auto"
        type="button"
        onClick={handleSignin}
        value="登入"
      ></input>
      <NavLink className="formControls_btnLink" to="/register">
        註冊帳號
      </NavLink>
    </form>
  );
}

export default Login;
