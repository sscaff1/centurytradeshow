Template.guardCardHelper.onRendered(function() {
  var instance = this;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY',
    widgetPositioning: {
      horizontal: 'left',
      vertical: 'bottom'
    }
  });
});

Template.nationalGuardHelper.onRendered(function() {
  var instance = this;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY',
    widgetPositioning: {
      horizontal: 'left',
      vertical: 'bottom'
    }
  });
});

Template.lawHelper.onRendered(function() {
  var instance = this;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY',
    widgetPositioning: {
      horizontal: 'left',
      vertical: 'bottom'
    }
  });
});

Template.lawHelper2.helpers({
  'state': function() {
    return States.find();
  }
})
