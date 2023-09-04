import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailsSlice";
import { Link } from "react-router-dom";

import CustomModal from "./CustomModal";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();
  const [showPopUp, setShowPopUp] = useState(false);

  const [radioData, setRadioData] = useState("");
  const { user, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {showPopUp && (
        <CustomModal
          id={id}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
        />
      )}

      <h2>All Data</h2>
      <input
        className="form-check-input"
        name="gender"
        type="radio"
        checked={radioData === ""}
        onChange={(e) => setRadioData("")}
      />
      <label className="form-check-label">All</label>
      <input
        className="form-check-input"
        name="gender"
        value="Male"
        type="radio"
        checked={radioData === "Male"}
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Male</label>
      <input
        className="form-check-input"
        name="gender"
        value="Female"
        type="radio"
        checked={radioData === "Female"}
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Female</label>
      {user &&
        user
          .filter((ele) => {
            if (searchData.length === 0) {
              return ele;
            } else {
              console.log(
                ele.name.toLowerCase().includes(searchData.toLowerCase())
              );
            }
          })
          .filter((ele) => {
            if (radioData === "Male") {
              return ele.gender === radioData;
            } else if (radioData === "Female") {
              return ele.gender === radioData;
            } else return ele;
          })

          .map((item) => (
            <div className="card w-50 mx-auto my-2" key={item.id}>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {item.email}
                </h6>
                <p className="card-text">{item.gender}</p>
                <button
                  className="card-link"
                  onClick={() => [setId(item.id), setShowPopUp(true)]}
                >
                  View
                </button>
                <Link to={`/edit/${item.id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  onClick={() => dispatch(deleteUser(item.id))}
                  className="card-link"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Read;
