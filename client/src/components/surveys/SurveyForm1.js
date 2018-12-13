// SurveyForm1 shows a form a user to add input!
// field is a helper for rendering anytype of html elements: text area, text inputs...
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utility/validateEmails";
import formFieldsData from "./formFieldsData";
// const FIELDS = [
//   { label: "Survey Title", name: "title" },
//   { label: "Subject Line", name: "subject" },
//   { label: "Email Body", name: "body" },
//   { label: "Recipient List", name: "email" }
// ];
// using es6 instead of passing field as props and say field.label and field.name
// We are constructing label and name in the parameter!
// and alwayas iterating over objects you must indicate the key properties since the name
// is always going to be unique we are passing the name props inside the key
class SurveyForm1 extends Component {
  renderFields() {
    return _.map(formFieldsData, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFieldsData, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a " + name;
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm1);

// <Field type="text" name="surveyTitle" component="input" />
