import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Plan } from './plan';

export const PlansList = React.createClass({

  propTypes: {
    plans: React.PropTypes.array,
    chosenPlan: React.PropTypes.func,
  },

  handleSelectedPlan(plan) {
    this.props.chosenPlan(plan);
  },

  render() {
    const { plans } = this.props;
    return plans.length > 0 ?
      <ListGroup componentClass="ul" className="price-list">
        {plans.map((plan) => (
          <Plan key={ plan._id } plan={ plan } selectedPlan={this.handleSelectedPlan}/>
        ))}
      </ListGroup>
    :
      <Alert bsStyle="warning">No plans yet.</Alert>;
  },
});
