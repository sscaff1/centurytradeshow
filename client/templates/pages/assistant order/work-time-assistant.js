Template.workTimesAssistant.events({
  'blur .startTime': function(event, template) {
    var startTime = template.$('[name=startTime]').val();
    if (template.$('[name=endTime]').val() == '') {
      template.$('[name=endTime]').val(startTime);
    }
  }
});
