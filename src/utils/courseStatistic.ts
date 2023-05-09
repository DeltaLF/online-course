import {
  CourseType,
  IAllCourse,
  ICourseByCategory,
  CourseCategory,
} from "../actions/types";

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

  const courseByCategory: ICourseByCategory = {} as ICourseByCategory;
  for (const category in CourseCategory) {
    courseByCategory[category as keyof typeof CourseCategory] = {
      count: 0,
      categoryIncome: 0,
      categoryStudent: 0,
    };
  }
  if (typeof courses !== "object") return courseByCategory;
  // const courseByCategory: ICourseByCategory = {};
  // courseCateories ={Software:{count:5,categorIncome:20000}}
  courses.forEach((course) => {
    courseByCategory[course.category]["count"] += 1;
    courseByCategory[course.category]["categoryIncome"] +=
      course.price * course.students.length;
    courseByCategory[course.category]["categoryStudent"] +=
      course.students.length;
  });
  return courseByCategory;
}

export { groupCoursesByCategory, groupAllCourse };
