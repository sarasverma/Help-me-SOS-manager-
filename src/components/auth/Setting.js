import { React, useState } from "react";

const Setting = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.mobileNo.toString().length < 10) {
      alert("Mobile no should be only 10 digit");
    } else {
      try {
        const url = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/settings`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            mobileNo: userData.mobileNo,
            authtoken: localStorage.getItem("authtoken"),
          }),
        });
        const json = await response.json();
        console.log(json);
        if (json.hasOwnProperty("status")) {
          alert("Updated profile success");
        } else {
          alert(json.detail);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="container">
      <div className="authForm">
        <div className="profileDetails">
          {" "}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Emergency Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                aria-describedby="emailHelp"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Emergency Mobile Number
              </label>
              <input
                type="Number"
                className="form-control"
                name="mobileNo"
                id="mobileNo"
                onChange={onChange}
                minLength={10}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
