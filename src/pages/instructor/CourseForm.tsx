import React from "react";
import {
  Field,
  InjectedFormProps,
  WrappedFieldProps,
  reduxForm,
} from "redux-form";
import InputTip from "../../components/tips/InputTip";
import { ICourseForm } from "../../actions/types";
import { useNavigate } from "react-router-dom";

interface IProps {
  name: string;
  onSubmit: (formValues: ICourseForm) => void;
}

function CourseForm({
  onSubmit,
  name,
  handleSubmit,
}: InjectedFormProps<ICourseForm, IProps> & IProps) {
  const navigate = useNavigate();

  function renderInput(
    args: WrappedFieldProps & { placeholder: string; type: string }
  ) {
    const { input, meta, placeholder, type } = args;

    const className = `${
      meta.error && meta.touched ? "" : "" //"is-invalid" : "is-valid"
    }`;

    return (
      <div className={className}>
        <input
          style={{ width: "100%" }}
          className="form-control"
          {...input}
          placeholder={placeholder}
          type={type}
          autoComplete="on"
        />
        <InputTip meta={meta} />
      </div>
    );
  }

  function onSubmitHandler(formValues: ICourseForm) {
    onSubmit(formValues);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="row g-3 align-items-center justify-content-center m-2">
        <div className="col-md-2  col-4">
          <label htmlFor="title" className="form-label">
            TITLE
          </label>
        </div>
        <div className="col-md-10 col-8">
          <Field
            name="title"
            component={renderInput}
            type="text"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="row g-3 align-items-center  justify-content-between m-2">
        <div className="col-md-2  col-4">
          <label htmlFor="description" className="form-label">
            DESCRIPTION
          </label>
        </div>
        <div className="col-md-10 col-8">
          <Field
            formType={name}
            name="description"
            component={renderInput}
            type="text"
            placeholder="Description"
          />
        </div>
      </div>
      <div className="row g-3 align-items-center justify-content-between m-2">
        <div className="col-md-2  col-4">
          <label htmlFor="price" className="form-label">
            PRICE
          </label>
        </div>
        <div className="col-md-10 col-8">
          <Field
            formType={name}
            name="price"
            component={renderInput}
            type="number"
            placeholder="Price"
          />
        </div>
      </div>
      <div className="row g-3 align-items-center justify-content-between m-2">
        <div className="col-md-2  col-4">
          <label htmlFor="Content" className="form-label">
            CONTENT
          </label>
        </div>
        <div className="col-md-10 col-8">
          <Field
            name="content"
            component="textarea"
            className="form-control"
            placeholder="Content"
            style={{ height: "250px" }}
          />
        </div>
      </div>

      <div className="row g-3 align-items-center justify-content-between m-2 mb-4">
        <div className="col-md-2  col-4">
          <label htmlFor="Content" className="form-label">
            CATEGORY
          </label>
        </div>
        <div className="col-md-10 col-8">
          <Field name="category" component="select" className="form-control">
            <option value="Design">Design</option>
            <option value="Software">Software</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Photography">Photography</option>
            <option value="Music">Music</option>
            <option value="Others">Others</option>
          </Field>
        </div>
      </div>
      <div className="d-flex justify-content-evenly">
        <button
          type="button"
          className="btn w-25 mt-2 btn-outline-danger"
          onClick={() => {
            navigate("/instructor/course");
          }}
        >
          Back
        </button>
        <button
          className={`btn w-25 mt-2 ${
            name === "Create" ? "btn-outline-success" : "btn-outline-info"
          }`}
        >
          {name}
        </button>
      </div>
    </form>
  );
}

const validate = (formValues: ICourseForm) => {
  // same key but the values are all string
  const errors: { [key in keyof ICourseForm]?: string } = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must type some description";
  }
  if (!formValues.price) {
    errors.price = "You must enter the price";
  } else if (formValues.price < 0) {
    errors.price = "Price should be larger than 0";
  }

  return errors;
};

export default reduxForm<ICourseForm, IProps>({
  form: "courseForm",
  validate: validate,
  enableReinitialize: true,
})(CourseForm);
//#issue
