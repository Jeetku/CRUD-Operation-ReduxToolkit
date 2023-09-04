import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../features/userDetailsSlice";
import { Link } from "react-router-dom";

const Read = () => {
  const { user, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>All Data</h2>
      {user?.map((item) => (
        <div className="card w-50 mx-auto my-2" key={item.id}>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {item.email}
            </h6>
            <p className="card-text">{item.gender}</p>
            <Link to="/" className="card-link">
              View
            </Link>
            <Link to="/" className="card-link">
              Edit
            </Link>
            <Link to="/" className="card-link">
              Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Read;
