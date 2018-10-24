import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";
// token is callback and its authorization
class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="UCrev"
        description="$5 monthly service"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn"> Purchase Monthly Credit </button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
