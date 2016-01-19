Meteor.publish('employees', () => {
  return Employees.find();
});

Meteor.publish('locations', () => {
  return Locations.find();
});

Meteor.publish('priceRates', () => {
  return PriceRates.find();
});

Meteor.publish('services', () => {
  return Services.find();
});

Meteor.publish('states', () => {
  return States.find();
});

Meteor.publish('orders', (orderId) => {
  return Orders.find({_id: orderId});
})
