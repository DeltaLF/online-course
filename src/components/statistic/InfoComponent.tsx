import React from "react";
import { CourseType, UserDataType } from "../../actions/types";
import {
  groupAllCourse,
  groupCoursesByCategory,
} from "../../utils/courseStatistic";

interface IInfoComponentProps {
  courses: CourseType[];
  user: UserDataType;
  isInstructor: boolean;
}
function InfoComponent({ courses, user, isInstructor }: IInfoComponentProps) {
  const { totalIncome, totalStudents } = groupAllCourse(courses);
  const courseByCategory = groupCoursesByCategory(courses);
  const categoryRender = [];
  for (const category in courseByCategory) {
    categoryRender.push(
      <li
        className="list-group-item list-group-item-info text-wrap"
        key={category}
      >
        <h3>{`Total ${category} class: ${courseByCategory[category]["count"]}`}</h3>
        {isInstructor && (
          <h5 className="mr-5">
            {`Category students: ${courseByCategory[category]["categoryStudent"]}`}
          </h5>
        )}
        <h5>{`Category ${isInstructor ? "income" : "expense"}: ${
          courseByCategory[category]["categoryIncome"]
        }$`}</h5>
      </li>
    );
  }

  return (
    <div className="container mt-5">
      <h1>INFO:</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <h2>
            {isInstructor
              ? `Instructor: ${user.username}`
              : `Hello ${user.username}!`}
          </h2>
        </li>
        <li className="list-group-item">
          <h2>Total Classes : {courses.length}</h2>
          <div className="row justify-content-center text-center">
            <div className="">
              <ul className="list-group list-group-flush">{categoryRender}</ul>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <h2> Total students count: {totalStudents}</h2>
        </li>
        <li className="list-group-item">
          <h2> Total income: {totalIncome} $</h2>
        </li>
      </ul>
    </div>
  );
}

export default React.memo(InfoComponent, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.courses) === JSON.stringify(nextProps.courses) &&
    prevProps.user.userId === nextProps.user.userId
  );
});
