import { composeWithTracker } from 'react-komposer';
import { PlansList } from '../components/plans-list';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const plans = Meteor.settings.public.plans;
  onData(null, { plans });
};

export default composeWithTracker(composer, Loading)(PlansList);
