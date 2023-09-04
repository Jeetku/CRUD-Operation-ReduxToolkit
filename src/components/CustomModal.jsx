import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";

const CustomModal = ({ id, showPopUp, setShowPopUp }) => {
  const allUsers = useSelector((state) => state.app.user);

  const singleUser = allUsers.filter((item) => item.id === id);
  console.log(singleUser);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopUp(false)} className="modalCloseBtn">
          ❌
        </button>
        <h1> user:-{id}</h1>
        <h5>{singleUser[0].name}</h5>
        <h6>{singleUser[0].email}</h6>
        <h6>{singleUser[0].age}</h6>
        <p>{singleUser[0].gender}</p>
      </div>
    </div>
  );
};

export default CustomModal;
