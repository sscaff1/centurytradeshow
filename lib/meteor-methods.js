Meteor.methods({
  saveSecurityOrder: function(order) {
    _.extend(order, {
      created: moment().toDate()
    });
    var orderId = Orders.insert(order);
    return {
      _id: orderId
    }
  }
});
