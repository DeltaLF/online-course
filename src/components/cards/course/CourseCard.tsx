import { Link } from "react-router-dom";
import { Auth, CourseOwner, CourseType } from "../../../actions/types";
import courseCatgory from "../../../resources/svgs";
import NumberDiscount from "../../promation/NumberDiscount";
import FunctionalButton from "./components/FunctionalButton";
import React from "react";
import "./CourseCard.css";

function CourseCard({
  course,
  firstVisited,
  auth,
  filterType,
  studentCount, // use this variable explicit so React.memo can compare corectlly
}: {
  course: CourseType;
  firstVisited?: string;
  auth: Auth;
  filterType: CourseOwner;
  studentCount: number;
}) {
  const averageRating =
    course.reviews.length > 0
      ? (
          course.reviews.reduce((prev, curr) => {
            return prev + curr.rating;
          }, 0) / course.reviews.length
        ).toFixed(2)
      : NaN;

  return (
    <div className="col course-card" key={course._id}>
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
              firstVisitTime={firstVisited}
              price={course.price}
            />
          </li>

          <li className="list-group-item">
            Instructor: {course.instructor.username}
          </li>
          <li className="list-group-item d-flex">
            <div className="col-5">Students: {studentCount}</div>
            <div className="col-5"> Rating: {averageRating}</div>
          </li>
        </ul>
        <div className="card-body card-body--bottom">
          <div className="row">
            <div className="col-6 p-0">
              <Link
                className="btn btn-outline-success w-100"
                to={`/course/${course._id}/detail`}
              >
                Detail
              </Link>
            </div>
            <div className="col-6 p-0">
              <FunctionalButton
                course={course}
                filterType={filterType}
                auth={auth}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default CourseCard;
export default React.memo(CourseCard);
