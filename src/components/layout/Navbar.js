import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    alert("logged out");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Help me!
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/more">
                More
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {!localStorage.getItem("token") ? (
              <>
                <Link className="btn btn-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-success mx-1" to="/signup">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <button className="btn btn-success" onClick={handleLogout}>
                  Log Out
                </button>
                <Link className="btn btn-success" to="/setting">
                  Setting
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
