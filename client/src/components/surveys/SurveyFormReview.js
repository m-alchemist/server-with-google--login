//form review
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const renderList = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>
          {label}
        </label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });
  return (
    <div>
      {" "}<h5>Review</h5>
      {renderList}
      <button
        className="btn-flat yellow white-text darken-3 "
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="btn-flat green right white-text "
        onClick={() => {
          submitSurvey(formValues, history);
        }}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  const formValues = state.form.surveyForm.values;
  return { formValues };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
