import { combineReducers } from "redux";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";
import { reducer as ReduxForm } from "redux-form";

export default combineReducers({
  surveys: surveysReducer,
  auth: authReducer,
  form: ReduxForm
});
