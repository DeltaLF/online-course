import React, { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import { fetchCourses } from "../../actions";
import SortButton from "./SortButton";
import { RootState } from "../../redux/store";
import { CourseOwner } from "../../actions/types";
import CourseCardGroup from "../cards/course/CourseCardGroup";

const mapStateToProps = (state: RootState) => {
  const { auth, courses } = state;
  return { newStudent: state.newStudent, auth, courses };
};

const connector = connect(mapStateToProps, {
  fetchCourses,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  filterType: CourseOwner;
}

function CourseShow({
  filterType,
  auth,
  courses,
  newStudent,
  fetchCourses,
}: Props) {
  useEffect(() => {
    fetchCourses({
      filterType,
      userId: auth.user ? auth.user.userId : null,
    });
  }, []);

  return (
    <div className="container mt-3">
      <SortButton />
      <CourseCardGroup
        courses={courses}
        auth={auth}
        newStudent={newStudent}
        filterType={filterType}
      />
    </div>
  );
}

export default connect(mapStateToProps, {
  fetchCourses,
})(CourseShow);
