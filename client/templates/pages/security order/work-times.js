Template.workTimes.onRendered(function() {
  var instance = this;
  instance.$('.datetimepicker').datetimepicker({
    sideBySide: true,
    showClose: true,
    widgetPositioning: {
      vertical: 'bottom'
    }
  });
});

Template.workTimes.events({
  'blur .startTime': function(event, template) {
    var startTime = template.$('[name=startTime]').val();
    if (template.$('[name=endTime]').val() == '') {
      template.$('[name=endTime]').val(startTime);
    }
  }
});

Template.workTimes.helpers({
  securityTypes() {
    return [
      {label: 'Unarmed', value: 'unarmed'},
      {label: 'Armed', value: 'armed'}
    ]
  },
  typeSelected(type) {
    return type === this.type
  }
})
