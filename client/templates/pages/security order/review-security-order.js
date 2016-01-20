Template.reviewSecurityOrder.helpers({
  feeExists: function() {
    if (this.value > 0) {
      return true;
    } else {
      return false;
    }
  },
  subTotalPriceBreakdown: function() {
    var order = this.order;
    var armedHours = parseFloat(order.totalArmed);
    var unarmedHours = parseFloat(order.totalUnarmed);
    var armedPrice = parseFloat(order.priceRates.armed);
    var unarmedPrice = parseFloat(order.priceRates.unarmed);
    return {
      armed: armedHours*armedPrice,
      unarmed: unarmedHours*unarmedPrice
    }
  },
  incentiveDate: function() {
    var eventDate = this.order.eventDate;
    eventDate = moment(eventDate, 'MM/DD/YYYY');
    return eventDate.subtract(21, 'days').format('MM/DD/YYYY');
  }
});

Template.reviewSecurityOrder.events({
  'click #edit-button': function(event, template) {
    Router.go('editSecurityOrder', {_id: this.order._id});
  }
});
