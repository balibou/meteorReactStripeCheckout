import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import PlansList from '../containers/plans-list.js';

const INSTANCE = this;
const GHOSTBUSTERS_LOGO = 'https://tmc-post-content.s3.amazonaws.com/ghostbusters-logo.png';

export const Plans = React.createClass({
  getInitialState() {
    return {
      selectedService: false,
      processing: false,
    };
  },

  componentWillMount() {
    const SELF = this;
    INSTANCE.checkout = INSTANCE.StripeCheckout.configure({
      key: Meteor.settings.public.stripe,
      image: GHOSTBUSTERS_LOGO,
      locale: 'auto',
      token(token) {
        const { selectedService } = SELF.state;
        const charge = {
          amount: token.amount || selectedService.amount.cents,
          currency: token.currency || 'usd',
          source: token.id,
          description: token.description || selectedService.name,
          receipt_email: token.email,
        };

        Meteor.call('processPayment', charge, (error, response) => {
          if (error) {
            SELF.setState({ processing: false });
            Bert.alert(error.reason, 'danger');
          }
          Bert.alert('Thanks! You\'ll be ghost free soon :)', 'success');
          return response;
        });
      },
      closed() {
        SELF.setState({ processing: false });
      },
    });
  },

  getChosenPlan(plan) {
    this.setState({ selectedService: plan });
    this.setState({ processing: true });
    INSTANCE.checkout.open({
      name: 'Ghostbusting Service',
      description: plan.name,
      amount: plan.amount.cents,
      bitcoin: false,
    });
  },

  render() {
    const { processing } = this.state;

    return <Row>
      <Col xs={12} sm={12}>
        <img width="150" src={GHOSTBUSTERS_LOGO} alt="Ghostbusters" />
        <h4 className="page-header">Plans</h4>

        {processing ?
          <p className="alert alert-warning">
            <i className="fa fa-refresh fa-spin">
            </i> Processing payment...
          </p>
        :
          <div>
            <p className="alert alert-info">
              We offer the following paranormal elimination services:
            </p>
            <PlansList chosenPlan={this.getChosenPlan}/>
            <p className="alert alert-warning">
              To demo, use any email address along with the card number
              <strong>4242 4242 4242 4242 </strong>, any <em>future </em>
              expiration date, and any 3 digit security code (e.g 555).
            </p>
          </div>
        }
      </Col>
    </Row>;
  },
});
