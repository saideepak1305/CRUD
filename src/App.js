import "./styles.css";
import { v4 as uuidv4 } from "uuid";
uuidv4();
import { useState } from "react";
export default function App() {
  const [user, setUser] = useState([]);
  const [buttonState, setButtonState] = useState("add");
  const [userInfo, setUserInfo] = useState({
    id: uuidv4(),
    name: "",
    mail: "",
    age: "",
    contact: "",
  });
  function handleChange(e) {
    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleClick() {
    setUser((currUser) => [...currUser, userInfo]);
    setUserInfo({
      id: uuidv4(),
      name: "",
      mail: "",
      age: "",
      contact: "",
    });
  }
  function handleRemove(id) {
    setUser((currUser) => {
      return currUser.filter((user) => {
        return user.id !== id;
      });
    });
  }
  function startEditing(user) {
    setUserInfo(user);
    setButtonState("edit");
  }
  function cancelEditing() {
    setUserInfo({
      id: uuidv4(),
      name: "",
      mail: "",
      age: "",
      contact: "",
    });
    setButtonState("add");
  }
  function updateData() {
    setUser((prevValue) => {
      return prevValue.map((user) => {
        if (user.id === userInfo.id) {
          return userInfo;
        }
        return user;
      });
    });
    cancelEditing();
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <label>Username</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={userInfo.name}
        name="name"
        onChange={handleChange}
      />
      <label>Gmail</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={userInfo.mail}
        name="mail"
        onChange={handleChange}
      />
      <label>Age</label>
      <input
        type="text"
        placeholder="Enter your age"
        value={userInfo.age}
        name="age"
        onChange={handleChange}
      />
      <label>Contact number</label>
      <input
        type="text"
        placeholder="Enter your phone"
        value={userInfo.contact}
        name="contact"
        onChange={handleChange}
      />
      {buttonState === "add" ? (
        <button onClick={handleClick}>Add</button>
      ) : (
        <div>
          <button onClick={updateData}>Update</button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      )}
      <div>
        <table>
          <tr>
            <td>Name</td>
            <td>Mail</td>
            <td>Age</td>
            <td>contact</td>
            <td>Action</td>
          </tr>
          <tbody>
            {user.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.mail}</td>
                  <td>{user.age}</td>
                  <td>{user.contact}</td>
                  <td>
                    <button onClick={() => startEditing(user)}>Edit</button>
                    <button onClick={() => handleRemove(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
