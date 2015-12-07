Meteor.methods({
  saveSecurityOrder: function(order) {
    _.extend(order, {
      booked: false,
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
      booked: false,
      orderType: 'assistant',
      created: moment().toDate()
    });
    var orderId = Orders.insert(order);
    return {
      _id: orderId
    }
  },
  insertApplication: function(employment) {
    _.extend(employment, {
      created: moment().toDate()
    })
    Applications.insert(employment);
  },
  updateOrder: function(orderId, order) {
    Orders.insert(orderId, {$set: order});
  }
});
