import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;

const inputList = [
  {
    name: "email",
    id: "email",
    type: "text",
    title: "Email",
    placeholder: "請輸入 email",
  },
  {
    name: "nickname",
    id: "nickname",
    type: "text",
    title: "您的暱稱",
    placeholder: "請輸入你的暱稱",
  },
  {
    name: "password",
    id: "password",
    type: "password",
    title: "密碼",
    placeholder: "請輸入密碼",
  },
  {
    name: "checkPassword",
    id: "checkPassword",
    type: "password",
    title: "再次輸入密碼",
    placeholder: "請再次輸入密碼",
  },
];

function Register() {
  const navigate = useNavigate();
  const [errorMSG, setErrorMSG] = useState([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    setErrorMSG([]);
    console.log(111, form);
    if (form.password != form.checkPassword) {
      setErrorMSG(["密碼錯誤"]);
      return;
    }
    (async () => {
      try {
        const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, form);
        console.log(res);
        navigate("/auth/login");
      } catch (err) {
        console.log(err);
        setErrorMSG(err.response.data.message);
      }
    })();
  };

  return (
    <form className="formControls">
      <h2>註冊帳號</h2>
      {inputList.map((item) => (
        <div key={item.id}>
          <label htmlFor={item.name} className="formControls">
            {item.title}
          </label>
          <input
            type={item.type}
            name={item.name}
            id={item.id}
            placeholder={item.placeholder}
            className="formControls_input"
            onChange={handleInput}
          />
        </div>
      ))}

      {errorMSG.map((err) => (
        <p id="err" className="text-danger">
          {err}
        </p>
      ))}
      <input
        type="button"
        value="Sign up"
        className="formControls_btnSubmit"
        onClick={handleSignUp}
      />
    </form>
  );
}

export default Register;
