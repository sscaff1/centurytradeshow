Template.services.helpers({
  serviceSecurity: function() {
    return Services.find({type: 'security'});
  },
  serviceStaffing: function() {
    return Services.find({type: 'staffing'});
  },
  namePretty: function() {
    console.log(this.name);
    return s.capitalize(this.name);
  }
});
