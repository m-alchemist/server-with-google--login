//survey new shows survey form and survey review

import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";
class SurveyNew extends Component {
  //Traditional way of adding state
  // constructor(props){
  //   super(props);
  //   this.state={showFormReview:false};
  // }
  //Babel Plugin allows adding state as below
  state = { showFormReview: false };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
