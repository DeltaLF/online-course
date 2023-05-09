// user

export enum USER_ACTIONS_TYPES {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export type UserSignInType = {
  email?: string;
  password?: string;
};

export type UserFormType = {
  username?: string;
} & UserSignInType;

export type UserDataType = {
  userId: string;
  username: string;
  exp: number;
  iat: number;
};

// message
export enum MESSAGE_ACTIONS_TYPES {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  CLEAR = "CLEAR",
}

export type Message = {
  message?: string;
};

// course
export enum CourseCategory {
  Others = "Others",
  Design = "Design",
  Software = "Software",
  Bussiness = "Bussiness",
  Photography = "Photography",
  Music = "Music",
}

const bodyStyles = window.getComputedStyle(document.body);
export const CourseCategoryColorMap: Record<CourseCategory, string> = {
  Others: bodyStyles.getPropertyValue("--color-course-others"),
  Design: bodyStyles.getPropertyValue("--color-course-design"),
  Software: bodyStyles.getPropertyValue("--color-course-software"),
  Bussiness: bodyStyles.getPropertyValue("--color-course-bussiness"),
  Photography: bodyStyles.getPropertyValue("--color-course-photography"),
  Music: bodyStyles.getPropertyValue("--color-course-music"),
};

export enum COURSE_ACTIONS_TYPES {
  SUBSCRIBE_COURSE = "SUBSCRIBE_COURSE",
  UNSUBSCRIBE_COURSE = "UNSUBSCRIBE_COURSE",
  CREATE_COURSE = "CREATE_COURSE",
  EDIT_COURSE = "EDIT_COURSE",
  FETCH_COURSE = "FETCH_COURSE",
  FETCH_COURSES = "FETCH_COURSES",
}

export interface ICourseForm {
  title: string;
  description: string;
  price: number;
  category: CourseCategory;
}

export interface CourseType extends ICourseForm {
  _id: string;
  instructor: Instructor;
  students: string[];
  reviews: IReview[];
}

export type ICourseByCategory = {
  [key in CourseCategory]: {
    count: number;
    categoryIncome: number;
    categoryStudent: number;
  };
};

export interface IAllCourse {
  totalStudents: number;
  totalIncome: number;
}

export type Student = {
  username: string;
};

export type Instructor = {
  username: string;
};

export enum CourseOwner {
  instructor = "instructor",
  student = "student",
  default = "default",
}
export type FetchCourseParamsTypes = {
  filterType: CourseOwner;
  userId: string | null;
  keyWord?: string;
};

export enum CourseSortType {
  Title = "Title",
  Category = "Category",
  Price = "Price",
  Instructor = "Instructor",
  reverse = "reverse",
}

// review

export enum REVIEW_ACTIONS_TYPES {
  // currentyl not used
  CREATE_REVIEW = "CREATE_REVIEW",
  EDIT_REVIEW = "EDIT_REVIEW",
  FETCH_REVIEW = "FETCH_REVIEW",
}

export interface ReviewFormType {
  content: string;
  rating: number;
}

export interface IReview extends ReviewFormType {
  date?: Date; // default Date.now
  reviewer: string;
}

//student

export enum STUDENT_ACTIONS_TYPES {
  CHECK_NEWSTUDENT = "CHECK_NEWSTUDENT",
}

export type SpecialOfferType = {
  firstVisited?: string;
  remainTime?: number;
};

// short cart

export enum SHOPCART_ACTIONS_TYPES {
  FETCH_SHOPCART = "FETCH_SHOPCART",
  ADD_SHOPCART = "ADD_SHOPCART",
  DELETE_SHOPCART = "DELETE_SHOPCART",
}

export type ShopCartType = {
  _id?: string;
  price: number;
  title: string;
  category: string;
};

// reduecer store states

export type Auth = {
  isSignedIn: boolean;
  user: UserDataType | null;
};

export type ReducerStates = {
  // update when all states are refactored
  auth?: any;
  form?: any;
  alert?: any;
  courses?: any;
  newStudent?: any;
  shopCart?: any;
};
