import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchCourse } from "../../actions";
import "./courseDetail.css";
import courseCatgory from "../../resources/svgs";

class CourseDetail extends React.Component {
  componentDidMount() {
    this.props.fetchCourse(this.props.match.params.courseId);
  }
  detailHeader(course) {
    console.log(this.props);

    if (!Array.isArray(course)) {
      return (
        <Fragment>
          <h5>
            {" "}
            {course.category} {">"}
          </h5>
          <h1>{course.title.toUpperCase()}</h1>
          <h4>{course.description}</h4>
          <p>{course.students.length} students</p>
          <p>Created by {course.instructor.username}</p>
        </Fragment>
      );
    }
  }

  renderSideBar(course) {
    return (
      <div className="sideBar text-center">
        <img
          src={courseCatgory[course.category.toLowerCase()]}
          className="card-img-top"
          alt="cousre image"
        />
        <p className="mt-3">
          <span className="fs-3">{course.price}$</span>
          {/* hide when the promotion time over */}
          <small>
            <del> {course.price * 4}$</del> 75% off
          </small>
        </p>
        <button className="btn btn-outline-warning w-75 mt-3">
          <h5> Go to cart</h5>
        </button>
        <button className="btn btn-outline-primary w-75 my-3">
          <h5> Subscribe now</h5>
        </button>

        <h5>This course includes: </h5>
        <ul className="fontAwesome px-3 text-start">
          <li className="list-group-item px-4"> &#xf03d; 2 hours content</li>

          <li className="list-group-item px-4"> &#xf02d; 3 articles</li>
          <li className="list-group-item px-4"> &#xf15b; 5 files</li>
        </ul>
      </div>
    );
  }

  contentRender(course) {
    let seeds =
      course.title[0].charCodeAt() +
      course.title[1].charCodeAt() * 3 +
      course.title[2].charCodeAt() * 2;
    seeds = 6 + Math.floor(seeds % 10);
    console.log(seeds);
    return Array.apply(null, Array(seeds)).map((empty, ind) => {
      return (
        <div key={ind}>
          <h5>Chapter {ind + 1}</h5>
          <p style={{ textIndent: "36px" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus natus eos molestiae fugiat. Maxime, possimus autem?
            Voluptates praesentium facere ex eaque, non animi consequuntur
            reprehenderit mollitia quae incidunt perspiciatis ipsa.
          </p>
        </div>
      );
    });
  }
  renderLearn() {
    return (
      <div className="fontAwesome">
        <div className="row">
          <div className="col-6">
            &#xf00c; reprehenderit mollitia quae incidunt perspiciatis ipsa{" "}
          </div>
          <div className="col-6">&#xf00c; sit amet consectetur</div>
        </div>
        <div className="row">
          <div className="col-6">&#xf00c; Repellendus natus eos</div>
          <div className="col-6">
            &#xf00c; Voluptates praesentium facere ex eaque{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-6">&#xf00c; Maxime, possimus autem</div>
          <div className="col-6">&#xf00c; non animi consequuntur</div>
        </div>
        <div className="row">
          <div className="col-6">&#xf00c; Lorem ipsum dolor</div>
        </div>
      </div>
    );
  }

  renderComment() {
    return (
      <div class="container mt-5">
        <div class="row d-flex ">
          {/* first card */}
          <div class="card p-3 commentCard col-3 ">
            <div class="d-flex justify-content-between align-items-center">
              <div class="user d-flex flex-row align-items-center">
                <div className="fontAwesome">&#xf007;</div>
                <span>
                  <small class="font-weight-bold text-primary">
                    james_olesenn
                  </small>{" "}
                </span>{" "}
              </div>{" "}
              <small>2 days ago</small>
            </div>
            <div class="action d-flex justify-content-between mt-2 align-items-center">
              <div class="reply px-4">
                <p>
                  this is aaaaaaaaaawesome!!! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Omnis, accusantium quidem
                  excepturi iure adipisci asperiores aut fugit voluptatum id
                  harum commodi expedita alias architecto. Cum neque voluptatem
                  assumenda expedita vel.
                </p>
              </div>
              <div class="icons align-items-center">
                {" "}
                <i class="fa fa-star text-warning"></i>{" "}
                <i class="fa fa-check-circle-o check-icon"></i>{" "}
              </div>
            </div>
          </div>

          {/* next card here */}
        </div>
      </div>
    );
  }

  render() {
    if (Array.isArray(this.props.course)) {
      return <Fragment></Fragment>;
    }
    const course = this.props.course;
    return (
      <Fragment>
        <div className="bg-dark detailHeaderBg">
          <div className="text-light text-wrapped detailHeader">
            {this.detailHeader(course)}
          </div>
        </div>
        {this.renderSideBar(course)}
        <div className="detailBody mt-3">
          <div className="card my-3">
            <div className="card-body">
              <h3>
                <strong>What you will learn:</strong>
              </h3>
              {this.renderLearn()}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>course content</h2>
            </div>
            <div className="card-body">{this.contentRender(course)}</div>
          </div>

          {this.renderComment(course)}
          {/* <div
            className="bg-danger commentArea"
            style={{ width: "500px", height: "300px" }}
          >
            <h3>comment area to be continued</h3>
          </div> */}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { course: state.courses };
};
export default connect(mapStateToProps, { fetchCourse })(CourseDetail);
