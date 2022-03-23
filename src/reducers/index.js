import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import alertReducer from "./alertReducer";
import courseReducer from "./courseReducer";
import specialOfferReducer from "./specialOfferReducer";
import shopCartReducer from "./shopCartReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer, //**
  streams: streamReducer,
  alert: alertReducer,
  courses: courseReducer,
  newStudent: specialOfferReducer,
  shopCart: shopCartReducer,
});
