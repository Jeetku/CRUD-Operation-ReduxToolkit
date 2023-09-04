import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();

  const [updateData, setUpdateData] = useState();

  const { user, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = user.filter((item) => item.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  return (
    <div>
      <h2 className="my-2">Fill the data</h2>
      <form className="w-50 mx-auto my-5">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={updateData && updateData.name}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={updateData && updateData.email}
          />
        </div>
        <div className="mb-3 w-25 mx-auto">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            required
            value={updateData && updateData.age}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData && updateData.gender === "Male"}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            checked={updateData && updateData.gender === "Female"}
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
          />
          <label className="form-check-label">Female</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
