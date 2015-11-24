Template.securityOrder.onCreated(function() {
  Session.set('loopWorkTimes', [{
    personnel: '',
    booth: '',
    startTime: '',
    endTime: ''
  }]);
  Session.set('totalPrice', 0);
  Session.set('postSubmitErrors', {});
  Session.set('dateMinus21', null);
});

Template.securityOrder.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();
  this.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY'
  });
});

Template.securityOrder.helpers({
  loopWorkTimes: function() {
    return Session.get('loopWorkTimes');
  },
  totalPrice: function() {
    return Session.get('totalPrice');
  },
  dateMinus21: function() {
    return Session.get('dateMinus21');
  }
});

Template.securityOrder.events({
  'click #moreWorkTimes, blur form': function(event, template) {
    event.preventDefault();

    var currentWorkTimes = [];
    var workTimes = template.findAll('[name=workTime]');
    _.each(workTimes, function(workTime) {
      var defaultValues = {
        type: $(workTime).find('[name=type]').val(),
        personnel: $(workTime).find('[name=personnel]').val(),
        booth: $(workTime).find('[name=booth]').val(),
        startTime: $(workTime).find('[name=startTime]').val(),
        endTime: $(workTime).find('[name=endTime]').val()
      }
      currentWorkTimes.push(defaultValues);
    });
    if ($(event.target).attr('id') === 'moreWorkTimes') {
      currentWorkTimes.push({});
    }
    Session.set('loopWorkTimes', currentWorkTimes);
    Meteor.setTimeout(function() {
      template.$('.datetimepicker').datetimepicker();
    }, 250);
  },
  'click form, blur form': function(event, template) {
    event.preventDefault();
    var currentWorkTimes = Session.get('loopWorkTimes');
    if (currentWorkTimes.length > 0) {
      var eventDate = moment(template.$('[name=eventDate]').val(),'MM/DD/YYYY');
      Session.set('dateMinus21', eventDate.subtract(21, 'days').format('MM/DD/YYYY'));
      var today = moment().startOf('day');
      var daysToEvent = Math.round(moment.duration(eventDate-today).asDays());
      var armed; var unarmed;
      if (daysToEvent > 21) {
        armed = 50;
        unarmed = 24.25;
      } else {
        armed = 55;
        unarmed = 30;
      }
      var totalPrice = 0;
      _.each(currentWorkTimes, function(workTime) {
        var startTime = moment(workTime.startTime, 'MM-DD-YYYY H:mm A');
        var endTime = moment(workTime.endTime, 'MM-DD-YYYY H:mm A');
        var totalTime = endTime.diff(startTime, 'hours');
        if (workTime.type === 'armed') {
          totalPrice = armed * workTime.personnel * totalTime
        } else {
          totalPrice = unarmed * workTime.personnel * totalTime
        }
      });
      Session.set('totalPrice', totalPrice);
    }
  }
});

Template.workTimes.events({
  'blur .startTime': function(event, template) {
    var startTime = template.$('[name=startTime]').val();
    template.$('[name=endTime]').val(startTime);
  },
  'blur .endTime': function(event, template) {
    var startTime = moment(template.$('[name=startTime]').val(), 'MM-DD-YYYY H:mm A');
    var endTime = moment(template.$('[name=endTime]').val(), 'MM-DD-YYYY H:mm A');
    var totalTime = endTime.diff(startTime, 'hours');
    var totalPersonnel = template.$('[name=personnel]').val()
    template.$('[name=totalTime]').text(totalTime*totalPersonnel);
  }
});
