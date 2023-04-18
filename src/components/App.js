import React, { Fragment } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./header/Header";
import UserRegister from "../pages/users/UserRegister";
import UserLogin from "../pages/users/UserLogin";
import UserPage from "../pages/users/UserPage";
import InstructorPage from "../pages/instructor/InstructorPage";
import CourseDetail from "./common/CourseDetail";
import PrivateRoute from "./PrivateRoute";
import { messageClear } from "../actions";
import { connect } from "react-redux";
import MainPage from "../pages/main/MainPage";
import ErrorBoundary from "./common/ErrorBoundary";
import GoToTop from "./common/goToTop";
import TopButton from "./common/TopButton";
import ErorrPage from "../pages/error/ErrorPage";

class App extends React.Component {
  render() {
    const { alert } = this.props;
    return (
      <ErrorBoundary>
        <div className="mb-5">
          {alert.message && (
            <div className={`fixed-bottom mb-0 alert opacity-50 ${alert.type}`}>
              {alert.message}
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                  <GoToTop />
                  <Header />
                  <TopButton />
                  <Outlet />
                </Fragment>
              }
            >
              <Route path="register" element={<UserRegister />} />
              <Route path="login" element={<UserLogin />} />
              <Route index element={<MainPage />} />
              <Route
                path="course/:courseId/detail"
                element={<CourseDetail />}
              />
              <Route
                path="/instructor/*"
                element={
                  <PrivateRoute>
                    <InstructorPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user/*"
                element={
                  <PrivateRoute>
                    <UserPage />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="*"
              element={
                <ErorrPage errorMessage="Page not found." statusCode={404} />
              }
            />
            {/* <PrivateRoute path="/instructor" component={InstructorPage} />
            <PrivateRoute path="/user/" component={UserPage} /> */}
          </Routes>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert };
};
export default connect(mapStateToProps, { messageClear })(App);
