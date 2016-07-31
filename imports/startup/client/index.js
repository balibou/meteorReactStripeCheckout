import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import '../../plugins/included/stripe/client/stripe';

Bert.defaults.style = 'growl-top-right';
