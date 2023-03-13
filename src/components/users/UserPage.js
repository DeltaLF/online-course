import React, { Fragment } from "react";
import { connect } from "react-redux";
import UserHeader from "./UserHeader";

// user route
import UserLogout from "./UserLogout";
import { Route, Routes, Outlet } from "react-router-dom";
import history from "../../helpers/history";
import CourseShow from "../share/CourseShow";
import UserInfo from "./UserInfo";

class UserPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <UserHeader />
                <Outlet />
              </Fragment>
            }
          >
            <Route
              path="course"
              element={<CourseShow filterType="student" />}
            />
            <Route path="statistic" element={<UserInfo />} />
          </Route>
        </Routes>
      </Fragment>
    );
  }
}

export default connect(null, {})(UserPage);
