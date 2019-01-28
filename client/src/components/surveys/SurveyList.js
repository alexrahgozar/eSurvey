import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div
          className="card darken-1"
          style={{ backgroundColor: "#8b9dc3" }}
          key={survey._id}
        >
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p style={{ fontFamily: "HelveticaNeue" }}>{survey.body}</p>
            <p style={{ color: "blue" }} className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a style={{ color: "blue" }}>Yes votes: {survey.yes} </a>
            <a style={{ color: "blue" }}>No votes: {survey.no} </a>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps(state) {
  return { surveys: state.surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
