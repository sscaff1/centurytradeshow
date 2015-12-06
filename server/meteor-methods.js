Meteor.methods({
  chargeCard: function(stripeToken, totalPrice) {
    check(stripeToken, String);
    var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);
    Stripe.charges.create({
      source: stripeToken,
      amount: totalPrice, // this is equivalent to $50
      currency: 'usd'
    }, function(err, charge) {
      console.log(err, charge);
    });
  }
});
