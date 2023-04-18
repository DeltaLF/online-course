import {
  Auth,
  CourseOwner,
  CourseType,
  SpecialOfferType,
} from "../../../actions/types";

import CourseCard from "./CourseCard";

function CourseCardGroup({
  courses,
  auth,
  newStudent,
  filterType,
}: {
  courses: CourseType[];
  auth: Auth;
  newStudent: SpecialOfferType;
  filterType: CourseOwner;
}) {
  const { firstVisited } = newStudent;

  return (
    <div className="row row-cols-1 row-cols-lg-3 g-4 mt-1">
      {courses && courses.length > 0 ? (
        // _id is assgined from mongoDB
        courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            firstVisited={firstVisited}
            auth={auth}
            filterType={filterType}
            studentCount={course.students.length}
          />
        ))
      ) : (
        <h3>No courses to show</h3>
      )}
    </div>
  );
}

export default CourseCardGroup;
