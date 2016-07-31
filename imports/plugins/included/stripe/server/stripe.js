import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
  const stripe = StripeAPI(Meteor.settings.private.stripe);

  Meteor.methods({
    processPayment(charge) {
      check(charge, {
        amount: Number,
        currency: String,
        source: String,
        description: String,
        receipt_email: String,
      });

      const handleCharge = Meteor.wrapAsync(stripe.charges.create, stripe.charges);
      const payment = handleCharge(charge);

      return payment;
    },
  });
});
