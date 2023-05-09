import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";
import InfoComponent from "../../components/statistic/InfoComponent";

class UserInfo extends React.Component {
  componentDidMount() {
    if (this.props.auth && this.props.auth.isSignedIn) {
      this.props.fetchCourses({
        userId: this.props.auth.user.userId,
        filterType: "student",
      });
    }
  }
  render() {
    if (!this.props.auth || !this.props.auth.isSignedIn) return <></>;
    const { user } = this.props.auth;

    return (
      <InfoComponent
        courses={this.props.courses}
        user={user}
        isInstructor={false}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { auth, courses } = state;

  return { auth, courses };
};

export default connect(mapStateToProps, { fetchCourses })(UserInfo);
