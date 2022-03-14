import React, { Fragment } from "react";
import { connect } from "react-redux";
import InstructorHeader from "./InstructorHeader";
import history from "../../helpers/history";
import { Router, Route, Switch } from "react-router-dom";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";
import InstructorShow from "./InstructorShow";
import InstructorInfo from "./InstructorInfo";

class InstructorPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <InstructorHeader />
          <Switch>
            <Route exact path="/instructor/course/">
              <InstructorShow />
            </Route>
            <Route exact path="/instructor/course/new">
              <CourseCreate />
            </Route>
            <Route
              exact
              path="/instructor/course/:courseId/edit"
              component={CourseEdit}
            />

            <Route exact path="/instructor/course/statistic">
              <InstructorInfo />
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(InstructorPage);
