Meteor.methods({
  saveSecurityOrder: function(order) {
    _.extend(order, {
      orderType: 'security',
      created: moment().toDate()
    });
    var orderId = Orders.insert(order);
    return {
      _id: orderId
    }
  },
  saveAssistantOrder: function(order) {
    _.extend(order, {
      orderType: 'assistant',
      created: moment().toDate()
    });
    var orderId = Orders.insert(order);
    return {
      _id: orderId
    }
  }
});
