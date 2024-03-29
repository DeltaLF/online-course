import React, { Fragment } from "react";
import InstructorHeader from "./InstructorHeader";
import { Route, Routes, Outlet } from "react-router-dom";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";
import CourseShow from "../../components/common/CourseShow";
import InstructorInfo from "./InstructorInfo";

class InstructorPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <InstructorHeader />
                <Outlet />
              </Fragment>
            }
          >
            <Route
              path="course"
              element={<CourseShow filterType="instructor" />}
            />
            <Route path="course/new" element={<CourseCreate />} />
            <Route path="course/:courseId/edit" element={<CourseEdit />} />
            <Route path="statistic" element={<InstructorInfo />} />
          </Route>
        </Routes>
      </Fragment>
    );
  }
}

export default InstructorPage;
