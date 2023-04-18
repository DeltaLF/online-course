import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { editCourse, fetchCourse } from "../../actions";
import CourseForm from "./CourseForm";
import { pick } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ICourseForm } from "../../actions/types";

const mapStateToProps = (state: RootState) => {
  return { course: state.courses[0] };
};

const connector = connect(mapStateToProps, { editCourse, fetchCourse });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

function CourseEdit({ fetchCourse, course, editCourse }: Props) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, []);

  function onSubmit(formValues: ICourseForm) {
    if (courseId) {
      editCourse(formValues, courseId);
      navigate("/instructor/course");
    }
  }

  return (
    <div className="container mt-5 justify-content-center">
      <h1> Edit course</h1>
      <hr />
      <CourseForm
        onSubmit={onSubmit}
        initialValues={pick(
          course,
          "title",
          "description",
          "price",
          "content",
          "category"
        )}
        name="Edit"
      />
    </div>
  );
}

export default connector(CourseEdit);
