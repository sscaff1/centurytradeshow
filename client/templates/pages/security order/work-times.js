Template.workTimes.events({
  'blur .startTime': function(event, template) {
    var startTime = template.$('[name=startTime]').val();
    template.$('[name=endTime]').val(startTime);
  }
});
