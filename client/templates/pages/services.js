Template.services.onRendered(function() {
  $("#owl-demo").owlCarousel({
    items: 5
  });
});

Template.services.helpers({
  serviceSecurity: function() {
    return Services.find({type: 'security'});
  },
  serviceStaffing: function() {
    return Services.find({type: 'staffing'});
  },
  namePretty: function() {
    return s.capitalize(this.name);
  }
});
