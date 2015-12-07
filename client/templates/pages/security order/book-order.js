Template.bookOrder.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

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
    var orderId = template.data._id;
    var totalPrice = Math.round(parseFloat(template.data.priceBreakDown.totalPrice)*100);

    StripeCheckout.open({
      key: Meteor.settings.public.stripe.testPublishableKey,
      amount: totalPrice,
      name: 'Security Order',
      description: 'Security Order',
      panelLabel: 'Book Order',
      billingAddress: true,
      token: function(result) {
        stripeToken = result.id;
        Meteor.call('chargeCard', stripeToken, totalPrice, orderId, result.email, function(error, result) {
          if (error)
            console.log(error);
          Router.go('home');
          Messages.throw('Your payment was successful. You should get a confirmation email with order details.', 'success');
        });
      }
    });
  },
  'submit form': function(event,template) {
    event.preventDefault();
    var orderId = template.data._id;
    var address = {
      name: template.$('[name=firstName]').val() + ' ' + template.$('[name=lastName]').val(),
      email: template.$('[name=email]').val(),
      address: template.$('[name=address]').val(),
      city: template.$('[name=city]').val(),
      state: template.$('[name=state]').val(),
      zipCode: template.$('[name=zipCode]').val(),
      booked: true
    }
    var errors = validateBillingAddress(address);
    if (!$.isEmptyObject(errors)) {
      return Session.set('postSubmitErrors', errors)
    }
    Meteor.call('updateOrder', orderId, address, function(error, result) {
      if (error)
        console.log(error);
      Router.go('home');
      Messages.throw('Your order has been booked. You should get a confirmation email with order details.', 'success');
    })
  }
})
