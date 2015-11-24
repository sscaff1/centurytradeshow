Template.securityOrder.onCreated(function() {
  var instance = this;
  instance.totalPrice = new ReactiveVar(0);
  instance.totalArmed = new ReactiveVar(0);
  instance.totalUnarmed = new ReactiveVar(0);
  instance.incentiveDate = new ReactiveVar(null);
  instance.paymentMethod = new ReactiveVar(false);
  instance.loopWorkTimes = new ReactiveVar([{
    personnel: '',
    booth: '',
    startTime: '',
    endTime: ''
  }]);
  Session.set('postSubmitErrors', {});
});

Template.securityOrder.onRendered(function() {
  var instance = this;
  instance.$('.datetimepicker').datetimepicker({
    sideBySide: true,
    showClose: true
  });

  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY'
  });
  instance.totalPrice.set(0);
  instance.totalArmed.set(0);
  instance.totalUnarmed.set(0);
  instance.incentiveDate.set(null);
  instance.loopWorkTimes.set([{
    personnel: '',
    booth: '',
    startTime: '',
    endTime: ''
  }]);
});

Template.securityOrder.helpers({
  loopWorkTimes: function() {
    return Template.instance().loopWorkTimes.get();
  },
  totalPrice: function() {
    return Template.instance().totalPrice.get();
  },
  dateMinus21: function() {
    return Template.instance().incentiveDate.get();
  },
  totalArmed: function() {
    return Template.instance().totalArmed.get();
  },
  totalUnarmed: function() {
    return Template.instance().totalUnarmed.get();
  },
  noncredit: function() {
    var paymentMethod = Template.instance().paymentMethod.get();
    if (paymentMethod === 'credit') {
      return {
        selected: true,
        noncredit: false
      }
    } else if (paymentMethod === 'noncredit'){
      return {
        selected: true,
        noncredit: true
      }
    } else {
      return {
        selected: false
      }
    }
  }
});

Template.securityOrder.events({
  'click #moreWorkTimes, blur .form-control': function(event, template) {
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
    template.loopWorkTimes.set(currentWorkTimes);
    Meteor.setTimeout(function() {
      template.$('.datetimepicker').datetimepicker();
    }, 250);
  },
  'blur .form-control': function(event, template) {
    event.preventDefault();

    var currentWorkTimes = template.loopWorkTimes.get();
    if (currentWorkTimes.length > 0) {
      var eventDate = moment(template.$('[name=eventDate]').val(),'MM/DD/YYYY');
      var today = moment().startOf('day');
      var daysToEvent = Math.round(moment.duration(eventDate-today).asDays());
      var armed; var unarmed;
      if (daysToEvent > 21) {
        armed = 59;
        unarmed = 25;
      } else {
        armed = 63.5;
        unarmed = 31;
      }
      var totalPrice = 0;
      var totalArmed = 0;
      var totalUnarmed = 0;
      _.each(currentWorkTimes, function(workTime) {
        var startTime = moment(workTime.startTime, 'MM-DD-YYYY H:mm A');
        var endTime = moment(workTime.endTime, 'MM-DD-YYYY H:mm A');
        var totalTime = endTime.diff(startTime, 'hours');
        if (totalTime > 0) {
          if (workTime.type === 'armed') {
            totalArmed = totalArmed + totalTime*workTime.personnel;
            totalPrice = totalPrice + armed * workTime.personnel * totalTime;
          } else {
            totalUnarmed = totalUnarmed + totalTime*workTime.personnel;
            totalPrice = totalPrice + unarmed * workTime.personnel * totalTime;
          }
        }
      });
      if (totalPrice > 0) {
        template.totalArmed.set(totalArmed);
        template.totalUnarmed.set(totalUnarmed);
        template.totalPrice.set(totalPrice);
      }
    }
  },
  'blur #eventDate': function(event, template) {
    var eventDate = moment(template.$('[name=eventDate]').val(),'MM/DD/YYYY');
    template.incentiveDate.set(eventDate.subtract(21, 'days').format('MM/DD/YYYY'));
  },
  'change [name=paymentMethod]': function(event,template) {
    template.paymentMethod.set(template.$(event.target).val());
  }
});

Template.workTimes.events({
  'blur .startTime': function(event, template) {
    var startTime = template.$('[name=startTime]').val();
    template.$('[name=endTime]').val(startTime);
  }
});
