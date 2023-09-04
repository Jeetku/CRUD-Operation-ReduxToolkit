import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailsSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState();

  const { user, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = user.filter((item) => item.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  const newData = (e) => {
    e.preventDefault();
    setUpdateData({ ...updateData, [e.target.name]: [e.target.value] });
  };

  console.log(updateData);
  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="my-2">Fill the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={updateData && updateData.name}
            onChange={newData}
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
            onChange={newData}
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
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData && updateData.gender === "Male"}
            onChange={newData}
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
            onChange={newData}
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
