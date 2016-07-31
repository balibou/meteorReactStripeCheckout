import React from 'react';
// import { ReactiveVar } from 'meteor/reactive-var';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import StripeCheckout from 'meteor/mrgalaxy:stripe';
import { Bert } from 'meteor/themeteorchef:bert';

const template = this;

export const Plans = React.createClass({
  getInitialState() {
    return {
      selectedService: false,
      processing: false,
    };
  },

  componentWillMount() {
    const self = this;
    template.checkout = template.StripeCheckout.configure({
      key: Meteor.settings.public.stripe,
      image: 'https://tmc-post-content.s3.amazonaws.com/ghostbusters-logo.png',
      locale: 'auto',
      token(token) {
        const { selectedService } = self.state;
        const charge = {
          amount: token.amount || selectedService.amount,
          currency: token.currency || 'usd',
          source: token.id,
          description: token.description || selectedService.description,
          receipt_email: token.email,
        };

        Meteor.call('processPayment', charge, (error, response) => {
          if (error) {
            self.setState({ processing: false });
            Bert.alert(error.reason, 'danger');
          }
          Bert.alert('Thanks! You\'ll be ghost free soon :)', 'success');
          return response;
        });
      },
      closed() {
        self.setState({ processing: false });
      },
    });
  },

  getComponent(event) {
    const pricing = {
      'full-torso-apparition': {
        amount: 300000,
        description: 'Full Torso Apparition Removal',
      },
      'free-floating-repeater': {
        amount: 425000,
        description: 'Free-Floating Repeater Removal',
      },
      'full-roaming-vapor': {
        amount: 500000,
        description: 'Full Roaming Vapor Removal',
      },
    };
    const service = pricing[event.target.dataset.service];
    this.setState({ selectedService: service });
    this.setState({ processing: true });
    template.checkout.open({
      name: 'Ghostbusting Service',
      description: service.description,
      amount: service.amount,
      bitcoin: true,
    });
  },

  render() {
    const { processing } = this.state;

    return <Row>
      <Col xs={ 12 } sm={ 12 }>
        <img width="150" src="https://tmc-post-content.s3.amazonaws.com/ghostbusters-logo.png" alt="Ghostbusters" />
        <h4 className="page-header">Plans</h4>

        {processing ?
          <p className="alert alert-warning">
          <i className="fa fa-refresh fa-spin">
          </i> Processing payment...</p>
        :
          <div>
            <p className="alert alert-info">
              We offer the following paranormal elimination services:
            </p>
            <ListGroup componentClass="ul" className="price-list">
              <ListGroupItem className="clearfix">
                <p className="pull-left">
                  <strong>$3,000</strong> &mdash;
                  Full Torso Apparition Removal
                </p>
                <a
                 data-service="full-torso-apparition"
                 className="btn btn-success pull-right"
                 onClick={this.getComponent}
                >
                  Buy Now
                </a>
              </ListGroupItem>
              <ListGroupItem className="clearfix">
                <p className="pull-left">
                  <strong>$4,250</strong> &mdash;
                  Free-Floating Repeater Removal
                </p>
                <a
                  data-service="free-floating-repeater"
                  className="btn btn-success pull-right"
                  onClick={this.getComponent}
                >
                Buy Now
              </a>
              </ListGroupItem>
              <ListGroupItem className="clearfix">
                <p className="pull-left">
                  <strong>$5,000</strong> &mdash;
                  Full Roaming Vapor Removal
                </p>
                <a
                  data-service="full-roaming-vapor"
                  className="btn btn-success pull-right"
                  onClick={this.getComponent}
                >
                  Buy Now
                </a>
              </ListGroupItem>
            </ListGroup>
            <p className="alert alert-warning">
              To demo, use any email address along with the card number
              <strong>4242 4242 4242 4242 </strong>, any <em>future </em>
              expiration date, and any 3 digit security code (e.g 555)</p>
          </div>
        }
      </Col>
    </Row>;
  },
});
