import { Link, useNavigate } from "react-router-dom";
import { Auth, CourseOwner, CourseType } from "../../../../actions/types";
import { subscribeCourse, unSubscribeCourse } from "../../../../actions";
import { useDispatch } from "react-redux";

function FunctionalButton({
  course,
  filterType,
  auth,
}: {
  course: CourseType;
  filterType: CourseOwner;
  auth: Auth;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTeacher = filterType === "instructor";
  const isStudentSubscribe =
    auth.isSignedIn &&
    course.students &&
    course?.students.indexOf(auth.user!.userId) >= 0;

  if (isTeacher) {
    return (
      <Link
        className="btn btn-outline-info w-100"
        to={`/instructor/course/${course._id}/edit`}
      >
        Edit
      </Link>
    );
  }
  // student
  if (isStudentSubscribe) {
    return (
      <button
        className="btn btn-outline-danger w-100"
        onClick={() => {
          dispatch(unSubscribeCourse(course));
          navigate("/");
        }}
      >
        Unsubscribe
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-outline-primary w-100"
        onClick={() => {
          dispatch(subscribeCourse(course));
          if (!auth.isSignedIn) navigate("/login");
        }}
      >
        Subscribe
      </button>
    );
  }
}

export default FunctionalButton;
