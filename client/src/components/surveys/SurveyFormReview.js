// SurveyFormReview shows users their new survey they have created before
// the final stage of submitting
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFieldsData from "./formFieldsData";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
const SurveyFormReview = ({
  onCancelSurvey,
  formValues,
  submitNewSurvey,
  history
}) => {
  const userReviewFields = _.map(formFieldsData, ({ name, label }) => {
    return (
      <div key={name}>
        <label style={{ fontSize: "23px" }}>{label}</label>
        <div style={{ fontSize: "20px" }}>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h4>Please Review Your Survey</h4>
      {userReviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancelSurvey}
      >
        Back
      </button>
      <button
        onClick={() => submitNewSurvey(formValues, history)}
        className="green white-text btn-flat right"
      >
        Final Submission
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
//redux store
// usually passed in as props but using ES6
// withRouter has histroy props
function mapToStateProps(state) {
  // console.log(state);
  return { formValues: state.form.surveyForm.values };
}
export default connect(
  mapToStateProps,
  actions
)(withRouter(SurveyFormReview));
