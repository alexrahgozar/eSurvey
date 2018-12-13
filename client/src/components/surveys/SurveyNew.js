// SurveyNew shows SurveyForm1 and SurveyFormReview1
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm1 from "./SurveyForm1";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  state = { showUserSurveyFormReview: false };

  renderContent() {
    if (this.state.showUserSurveyFormReview) {
      return (
        <SurveyFormReview
          onCancelSurvey={() =>
            this.setState({ showUserSurveyFormReview: false })
          }
        />
      );
    }
    // callback onSurveySubmit
    return (
      <SurveyForm1
        onSurveySubmit={() =>
          this.setState({
            showUserSurveyFormReview: true
          })
        }
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// to clear form values is when we are stepping away from surveynew
// toggling from surveyform and surveyformreview doesnt empty the values
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
