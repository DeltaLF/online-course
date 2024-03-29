import React from "react";
import { Link } from "react-router-dom";

const InstructorHeader = (props) => {
  return (
    <div className="navbar navbar-dark dark bg-primary text-white">
      <div className="container">
        <div className="align-items-start flex-column">
          <div className="row">
            <Link to="/instructor/course" className="navbar-brand">
              <h2> My teaching</h2>
            </Link>
          </div>

          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-2">
              <Link to="/instructor/course" className="nav-link text-white">
                My course
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/instructor/course/new" className="nav-link text-white">
                Create coure
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/instructor/statistic" className="nav-link text-white">
                Statistic
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructorHeader;
