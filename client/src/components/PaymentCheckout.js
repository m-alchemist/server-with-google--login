import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";
class PaymentCheckout extends Component {
  render() {
    return (
      <StripeCheckout
        name="App Name"
        description="pay for blah blah"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPEPUBLISHABLEKEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(PaymentCheckout);
