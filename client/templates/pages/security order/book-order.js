Template.bookOrder.helpers({
  noncredit: function() {
    if (this.paymentMethod === 'noncredit') {
      return true;
    } else {
      return false;
    }
  },
  securityOrderType: function() {
    if (this.orderType === 'security') {
      return true;
    } else {
      return false;
    }
  }
});

Template.bookOrder.events({
  'click #creditCard': function(event,template) {
    event.preventDefault();
    console.log(template);
    var totalPrice = Math.round(parseFloat(template.data.priceBreakDown.totalPrice)*100);

    StripeCheckout.open({
      key: Meteor.settings.public.stripe.testPublishableKey,
      amount: totalPrice,
      name: 'Security Order',
      description: 'Security Order',
      panelLabel: 'Century Staffing and Security',
      billingAddress: true,
      token: function(res) {
        stripeToken = res.id;
        console.info(res);
        Meteor.call('chargeCard', stripeToken, totalPrice);
      }
    });
  }
})
