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
            <span
              className="card-title"
              style={{
                color: "black",
                fontFamily: "Times",
                fontSize: "25px",
                textDecoration: "underline"
              }}
            >
              {survey.title}
            </span>
            <p
              style={{
                color: "black",
                fontFamily: "HelveticaNeue",
                fontSize: "20px"
              }}
            >
              {survey.body}
            </p>
            <p
              style={{
                color: "blue",
                fontFamily: "Times",
                fontSize: "18px"
              }}
              className="right"
            >
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a
              style={{
                color: "blue",
                fontFamily: "Times",
                fontSize: "22px"
              }}
            >
              Yes votes: {survey.yes}{" "}
            </a>
            <a
              style={{
                color: "blue",
                fontFamily: "Times",
                fontSize: "22px"
              }}
            >
              No votes: {survey.no}{" "}
            </a>
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
