Template.workTimesAssistant.onRendered(function() {
  var instance = this;
  instance.$('.datetimepicker').datetimepicker({
    sideBySide: true,
    showClose: true,
    widgetPositioning: {
      vertical: 'bottom'
    }
  });
});

Template.workTimesAssistant.events({
  'blur .startTime': function(event, template) {
    var startTime = template.$('[name=startTime]').val();
    if (template.$('[name=endTime]').val() == '') {
      template.$('[name=endTime]').val(startTime);
    }
  }
});

Template.workTimesAssistant.helpers({
  assistantTypes() {
    return [
      {value: 'host', label: 'Host'},
      {value: 'hostess', label: 'Hostess'},
      {value: 'hostB', label: 'Host Bilingual'},
      {value: 'hostessB', label: 'Hostess Bilingual'},
      {value: 'hosta', label: 'Host or Hostess'},
      {value: 'hostaB', label: 'Host or Hostess Bilingual'},
    ]
  },
  matchesType(value) {
    return value === this.type;
  }
})
