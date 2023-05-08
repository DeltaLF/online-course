import "./styles/main.scss";
import React, { Fragment } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import UserRegister from "./pages/users/UserRegister";
import UserLogin from "./pages/users/UserLogin";
import UserPage from "./pages/users/UserPage";
import InstructorPage from "./pages/instructor/InstructorPage";
import CourseDetail from "./components/common/CourseDetail";
import PrivateRoute from "./components/PrivateRoute";
import { messageClear } from "./actions";
import { connect } from "react-redux";
import MainPage from "./pages/main/MainPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import GoToTop from "./components/common/goToTop";
import TopButton from "./components/common/TopButton";
import ErorrPage from "./pages/error/ErrorPage";
import Footer from "./components/footer/Footer";

class App extends React.Component {
  render() {
    const { alert } = this.props;
    return (
      <ErrorBoundary>
        <>
          {alert.message && (
            <div className={`fixed-bottom mb-0 alert opacity-50 ${alert.type}`}>
              {alert.message}
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                  }}
                >
                  <GoToTop />
                  <Header />
                  <TopButton />
                  <div style={{ flex: 1 }}>
                    <Outlet />
                  </div>
                  <Footer />
                </div>
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
        </>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert };
};
export default connect(mapStateToProps, { messageClear })(App);
