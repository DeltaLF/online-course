import React, { Fragment } from "react";
import { connect } from "react-redux";
import UserHeader from "./UserHeader";

// user route
import UserLogout from "./UserLogout";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../helpers/history";
import CourseShow from "../share/CourseShow";
import UserInfo from "./UserInfo";

class UserPage extends React.Component {
  render() {
    console.log("UUUUUUUUUUser page is rndered");
    return (
      <Fragment>
        <Router history={history}>
          <UserHeader />
          <Switch>
            <Route path="/user/logout" component={UserLogout} />
            <Route
              path="/user/course"
              render={() => {
                return <CourseShow filterType="student" />;
                // use render to pass props
              }}
            />
            <Route path="/user/statistic" component={UserInfo} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(UserPage);
