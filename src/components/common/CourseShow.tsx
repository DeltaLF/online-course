import React, { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import {
  fetchCourses,
  subscribeCourse,
  unSubscribeCourse,
} from "../../actions";
import courseCatgory from "../../resources/svgs";
import SortButton from "./SortButton";
import { Link, useNavigate } from "react-router-dom";
import NumberDiscount from "../promation/NumberDiscount";
import { RootState } from "../../redux/store";
import { CoureOwner, CourseType } from "../../actions/types";

const mapStateToProps = (state: RootState) => {
  const { auth, courses } = state;
  return { newStudent: state.newStudent.firstVisited, auth, courses };
};

const connector = connect(mapStateToProps, {
  fetchCourses,
  subscribeCourse,
  unSubscribeCourse,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  filterType: CoureOwner;
}

function CourseShow({
  filterType,
  auth,
  courses,
  newStudent,
  fetchCourses,
  subscribeCourse,
  unSubscribeCourse,
}: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    fetchCourses({
      filterType,
      userId: auth.user ? auth.user.userId : null,
    });
  }, []);

  function functionalButton(course: CourseType) {
    if (filterType === "instructor") {
      return (
        <Link
          className="btn btn-outline-info w-100"
          to={`/instructor/course/${course._id}/edit`}
        >
          Edit
        </Link>
      );
    } else {
      if (
        auth.isSignedIn &&
        course.students &&
        course?.students.indexOf(auth.user!.userId) >= 0
      ) {
        return (
          <button
            className="btn btn-outline-danger w-100"
            onClick={() => {
              unSubscribeCourse(course);
              navigate("/user/course");
            }}
          >
            Unsubscribe
          </button>
        );
      }
      return (
        <button
          className="btn btn-outline-primary w-100"
          onClick={() => {
            subscribeCourse(course);
          }}
        >
          Subscribe
        </button>
      );
    }
  }

  function renderCourseCard() {
    if (courses && courses.length > 0) {
      const courseCards = courses.map((course) => {
        let averageRating =
          course.reviews.length > 0
            ? (
                course.reviews.reduce((prev, curr) => {
                  return prev + curr.rating;
                }, 0) / course.reviews.length
              ).toFixed(2)
            : NaN;

        return (
          <div className="col" key={course._id}>
            <div className="card h-100">
              <img
                src={
                  courseCatgory[
                    course.category.toLowerCase() as keyof typeof courseCatgory
                  ]
                }
                className="card-img-top"
                alt="course"
              />
              <div className="card-body">
                <h4 className="card-title">{course.title}</h4>
                <p className="card-text">Description: {course.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NumberDiscount
                    firstVisitTime={newStudent}
                    price={course.price}
                  />
                </li>

                <li className="list-group-item">
                  Instructor: {course.instructor.username}
                </li>
                <li className="list-group-item d-flex">
                  <div className="col-5">
                    Students: {course.students.length}
                  </div>
                  <div className="col-5"> Rating: {averageRating}</div>
                </li>
              </ul>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 p-0">
                    <Link
                      className="btn btn-outline-success w-100"
                      to={`/course/${course._id}/detail`}
                    >
                      Detail
                    </Link>
                    {/* <button className="btn btn-outline-success w-100">
                      Detail
                    </button> */}
                  </div>
                  <div className="col-6 p-0">{functionalButton(course)}</div>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return courseCards;
    } else {
      return <h3>No courses to show</h3>;
    }
  }

  return (
    <div className="container mt-3">
      <SortButton />
      <div className="row row-cols-1 row-cols-lg-3 g-4 mt-1">
        {renderCourseCard()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {
  fetchCourses,
  subscribeCourse,
  unSubscribeCourse,
})(CourseShow);
