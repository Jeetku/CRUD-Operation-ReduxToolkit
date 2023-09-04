import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailsSlice";
import { Link } from "react-router-dom";

import CustomModal from "./CustomModal";

const Read = () => {
  const { user, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [id, setId] = useState();
  const [showPopUp, setShowPopUp] = useState(false);

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
      {user?.map((item) => (
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
            <button className="card-link">Edit</button>
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
