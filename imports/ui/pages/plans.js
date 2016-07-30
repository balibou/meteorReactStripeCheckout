import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

const processing = false;
export const Plans = () => (
  <Row>
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
              <a href="#" data-service="full-torso-apparition"
              className="btn btn-success pull-right">
                Buy Now
              </a>
            </ListGroupItem>
            <ListGroupItem className="clearfix">
              <p className="pull-left">
                <strong>$4,250</strong> &mdash;
                Free-Floating Repeater Removal
              </p>
              <a href="#" data-service="free-floating-repeater"
            className="btn btn-success pull-right">
              Buy Now
            </a>
            </ListGroupItem>
            <ListGroupItem className="clearfix">
              <p className="pull-left">
                <strong>$5,000</strong> &mdash;
                Full Roaming Vapor Removal
              </p>
              <a href="#" data-service="full-roaming-vapor" className="btn btn-success pull-right">
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
  </Row>
);
