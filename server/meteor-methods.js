// var Future = Npm.require('fibers/future');
//
// Meteor.methods({
//   chargeCard: function(stripeToken, totalPrice, orderId, email) {
//     var stripeCharge = new Future();
//     check(stripeToken, String);
//     var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);
//     var result = Stripe.charges.create({
//       source: stripeToken,
//       amount: totalPrice,
//       currency: 'usd'
//     }, function(error, result) {
//       if (error)
//         console.log(stripeCharge.return(error))
//       if (result.source.address_line2) {
//         address_line = result.source.address_line1 + ' ' + result.source.address_line2;
//       } else {
//         address_line = result.source.address_line1;
//       }
//       var address = {
//         name: result.source.name,
//         email: email,
//         address: address_line,
//         city: result.source.address_city,
//         state: result.source.address_state,
//         zipCode: result.source.address_zip,
//         booked: true
//       }
//       stripeCharge.return(address);
//     });
//     var address = stripeCharge.wait();
//     Orders.update(orderId, {$set: address});
//   }
// });
