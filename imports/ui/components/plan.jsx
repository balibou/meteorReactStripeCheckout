import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

export const Plan = React.createClass({

  propTypes: {
    plan: React.PropTypes.object.isRequired,
    selectedPlan: React.PropTypes.func,
  },

  handleClick() {
    this.props.selectedPlan(this.props.plan);
  },

  render() {
    const { plan } = this.props;
    return <ListGroupItem key={plan._id} className="clearfix">
      <p className="pull-left">
        <strong>{plan.amount.usd}</strong> &mdash;
        {plan.name}
      </p>
      <a
       data-service="full-torso-apparition"
       className="btn btn-success pull-right"
       onClick={this.handleClick}

      >
        Buy Now
      </a>
    </ListGroupItem>;
  },
});
