import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";

import InfoComponent from "../../components/statistic/InfoComponent";

class InstructorInfo extends React.Component {
  componentDidMount() {
    if (this.props.auth && this.props.auth.isSignedIn) {
      this.props.fetchCourses({
        userId: this.props.auth.user.userId,
        filterType: "instructor",
      });
    }
  }

  render() {
    if (!this.props.auth || !this.props.auth.isSignedIn) return <></>;
    const { user } = this.props.auth;
    /*
    InstructorInfo: access data from redux
    InfoComponent: pure component to render data
     */
    return (
      <InfoComponent
        courses={this.props.courses}
        user={user}
        isInstructor={true}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { auth, courses } = state;

  return { auth, courses };
};

export default connect(mapStateToProps, { fetchCourses })(InstructorInfo);
