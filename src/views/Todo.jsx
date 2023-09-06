import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddBox, MdLogout, MdDelete, MdEdit } from "react-icons/md";
const { VITE_APP_HOST } = import.meta.env;

function Todo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("");
  const [editID, setEditID] = useState("");
  const [editContent, setEditContent] = useState("");
  const [nickname, setNickname] = useState("");

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${VITE_APP_HOST}/users/checkout`, {
          headers: {
            Authorization: cookieValue,
          },
        });
        console.log(res.data);
        setNickname(res.data.nickname);
        getTodos();
      } catch (err) {
        navigate("/");
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (filter == "all") {
      setShowTodos(todos);
    } else if (filter == "done") {
      setShowTodos(todos.filter((item) => item.status == true));
    } else {
      setShowTodos(todos.filter((item) => item.status == false));
    }
  }, [filter, todos]);

  const getTodos = () => {
    (async () => {
      try {
        setFilter("all");
        const { data } = await axios.get(`${VITE_APP_HOST}/todos`, {
          headers: {
            Authorization: cookieValue,
          },
        });
        console.log("gettodos", data.data);
        setTodos(data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleAddTodo = () => {
    if (newTodo == "") {
      return;
    }

    (async () => {
      try {
        const { data } = await axios.post(
          `${VITE_APP_HOST}/todos`,
          {
            content: newTodo,
          },
          {
            headers: {
              Authorization: cookieValue,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("addtodo", data);
        setNewTodo("");
        setFilter("all");
        getTodos();
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleDeleteTodo = (id) => {
    (async () => {
      try {
        const { data } = await axios.delete(`${VITE_APP_HOST}/todos/${id}`, {
          headers: {
            Authorization: cookieValue,
          },
        });
        console.log(data);
        getTodos();
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleToggle = (id) => {
    (async () => {
      try {
        const { data } = await axios.patch(
          `${VITE_APP_HOST}/todos/${id}/toggle`,
          {},
          {
            headers: {
              Authorization: cookieValue,
            },
          }
        );
        console.log("toggle", data);
        getTodos();
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleEdit = (e, id) => {
    if (e.key === "Enter") {
      (async () => {
        try {
          const { data } = await axios.put(
            `${VITE_APP_HOST}/todos/${id}`,
            {
              content: editContent,
            },
            {
              headers: {
                Authorization: cookieValue,
              },
            }
          );
          console.log(data);
          setEditID("");
          getTodos();
        } catch (err) {
          console.log(err);
        }
      })();
    }
  };

  const openEdit = (item) => {
    setEditContent(item.content);
    setEditID(item.id);
  };

  const handleSignout = () => {
    (async () => {
      try {
        const res = await axios.post(
          `${VITE_APP_HOST}/users/sign_out`,
          {},
          {
            headers: {
              Authorization: cookieValue,
            },
          }
        );
        console.log(res.data);
        navigate("/");
      } catch (err) {
        console.log(err.response);
      }
    })();
  };

  const handleCleatDone = async () => {
    if (todos.length < 1) {
      alert("目前並無已完成待辦");
    }
    todos.map((item) => {
      if (item.status) {
        handleDeleteTodo(item.id);
      }
    });
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>ONLINE TODO LIST</h1>
        <ul>
          <li className="todo_sm">
            <span className="p-4">{nickname}的代辦</span>
          </li>
          <li>
            <MdLogout
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={handleSignout}
            />
          </li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              type="text"
              placeholder="請輸入待辦事項"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeypress}
              value={newTodo}
            ></input>
            <MdAddBox
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              onClick={handleAddTodo}
            />
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li className={filter == "all" ? "tab active" : "tab"}>
                <div className="" onClick={() => setFilter("all")}>
                  全部
                </div>
              </li>
              <li className={filter == "doing" ? "tab active" : "tab"}>
                <div className="" onClick={() => setFilter("doing")}>
                  待完成
                </div>
              </li>
              <li className={filter == "done" ? "tab active" : "tab"}>
                <div className="" onClick={() => setFilter("done")}>
                  已完成
                </div>
              </li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                {todos.length < 1 ? (
                  <p className="text-danger text-center">目前尚無待辦事項</p>
                ) : (
                  ""
                )}
                {showTodos.map((item) => (
                  <li key={item.id}>
                    <label className="todoList_label">
                      <input
                        className="todoList_input"
                        type="checkbox"
                        checked={item.status}
                        onChange={() => handleToggle(item.id)}
                      ></input>

                      {item.id == editID ? (
                        <input
                          onChange={(e) => setEditContent(e.target.value)}
                          onKeyDown={(e) => handleEdit(e, item.id)}
                          type="text"
                          name=""
                          id=""
                          value={editContent}
                        ></input>
                      ) : (
                        <span>{item.content}</span>
                      )}
                    </label>
                    <div className="d-flex">
                      <span onClick={() => openEdit(item)}>
                        <MdEdit
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                      <span onClick={() => handleDeleteTodo(item.id)}>
                        <MdDelete
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="todoList_statistics">
                <p>
                  {" "}
                  {todos.filter((item) => item.status == false).length}{" "}
                  個待完成項目
                </p>
                <span style={{ cursor: "pointer" }} onClick={handleCleatDone}>
                  清除已完成項目
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
