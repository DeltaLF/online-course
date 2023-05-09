import { CourseType } from "../actions/types";

interface ICourseByCategory {
  [key: string]: {
    count: number;
    categoryIncome: number;
    categoryStudent: number;
  };
}

interface IAllCourse {
  totalStudents: number;
  totalIncome: number;
}

function groupAllCourse(courses: CourseType[]): IAllCourse {
  const allCourse: IAllCourse = { totalIncome: 0, totalStudents: 0 };
  for (const course of courses) {
    allCourse.totalStudents += course.students.length;
    allCourse.totalIncome += course.students.length * course.price;
  }
  return allCourse;
}

function groupCoursesByCategory(courses: CourseType[]): ICourseByCategory {
  /*
    group courses by same category
    */

  if (typeof courses !== "object") return {};
  const courseByCategory: ICourseByCategory = {};
  // courseCateories ={Software:{count:5,categorIncome:20000}}
  courses.forEach((course) => {
    if (course.category in courseByCategory) {
      courseByCategory[course.category]["count"] += 1;
      courseByCategory[course.category]["categoryIncome"] +=
        course.price * course.students.length;
      courseByCategory[course.category]["categoryStudent"] +=
        course.students.length;
    } else {
      courseByCategory[course.category] = {
        count: 1,
        categoryIncome: course.price * course.students.length,
        categoryStudent: course.students.length,
      };
    }
  });
  return courseByCategory;
}

export { groupCoursesByCategory, groupAllCourse };
