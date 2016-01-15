Template.assistantOrder.onCreated(function() {
  var instance = this;
  instance.workTime = new ReactiveVar([{}]);
  instance.incentiveDate = new ReactiveVar(null);
  instance.totalNormal = new ReactiveVar(0);
  instance.totalNormalOvertime = new ReactiveVar(0);
  instance.totalBil = new ReactiveVar(0);
  instance.totalBilOvertime = new ReactiveVar(0);
  instance.totalPrice = new ReactiveVar(0);
  instance.paymentMethod = new ReactiveVar(null);
  instance.eventLocation = new ReactiveVar(null);
  Session.set('postSubmitErrors', {});

  instance.priceRates = function() {
    var eventDate = moment(instance.$('[name=eventDate]').val(),'MM/DD/YYYY');
    var today = moment().startOf('day');
    var daysToEvent = Math.round(moment.duration(eventDate-today).asDays());
    if (daysToEvent >= 21) {
      return {
        normal: 25,
        bil: 30,
        normalOvertime: 37.50,
        bilOvertime: 45
      }
    } else {
      return {
        normal: 31,
        bil: 36,
        normalOvertime: 46.50,
        bilOvertime: 54
      }
    }
  }

  instance.priceBreakDown = function() {
    var paymentMethod = instance.paymentMethod.get();
    var totalPrice = instance.totalPrice.get();
    if (paymentMethod === 'credit') {
      return {
        credit: true,
        ccFee: totalPrice * .03,
        totalPrice: totalPrice * 1.03,
        selected: true
      }
    } else if (paymentMethod === 'noncredit') {
      return {
        noncredit: true,
        selected: true,
        totalPrice: totalPrice
      }
    } else {
      return false;
    }
  }
});

Template.assistantOrder.onRendered(function() {
  var instance = this;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY',
    widgetPositioning: {
      vertical: 'bottom'
    }
  });
});

Template.assistantOrder.helpers({
  eventLocations: function() {
    return Locations.find();
  },
  workTime: function() {
    return Template.instance().workTime.get();
  },
  dateMinus21: function() {
    return Template.instance().incentiveDate.get();
  },
  totalNormal: function() {
    return Template.instance().totalNormal.get();
  },
  totalBil: function() {
    return Template.instance().totalBil.get();
  },
  totalNormalOvertime: function() {
    return Template.instance().totalNormalOvertime.get();
  },
  totalBilOvertime: function() {
    return Template.instance().totalBilOvertime.get();
  },
  totalPrice: function() {
    return Template.instance().totalPrice.get();
  },
  paymentMethod: function() {
    return Template.instance().priceBreakDown();
  }
});

Template.assistantOrder.events({
  'click #moreWorkTimes, blur [name=workTime] .form-control': function(event, template) {
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
    template.workTime.set(currentWorkTimes);
  },
  'blur [name=eventDate]': function(event, template) {
    var eventDate = moment(template.$('[name=eventDate]').val(),'MM/DD/YYYY');
    template.incentiveDate.set(eventDate.subtract(21, 'days').format('MM/DD/YYYY'));
  },
  'change [name=paymentMethod]': function(event,template) {
    event.preventDefault();
    template.paymentMethod.set($(event.target).val());
  },
  'blur .form-control': function(event, template) {
    event.preventDefault();
    var currentWorkTimes = template.workTime.get();
    if (currentWorkTimes.length > 0) {
      var priceRates = template.priceRates();
      var eventLocation = template.eventLocation.get();
      var totalPrice = 0;
      var totalNormal = 0;
      var totalNormalOvertime = 0;
      var totalBil = 0;
      var totalBilOvertime = 0;
      _.each(currentWorkTimes, function(workTime) {
        var startTime = moment(workTime.startTime, 'MM-DD-YYYY H:mm A');
        var endTime = moment(workTime.endTime, 'MM-DD-YYYY H:mm A');
        var totalTime = endTime.diff(startTime, 'minutes');
        if (totalTime > 0) {
          if ((workTime.type === 'host' || workTime.type === 'hostess' || workTime.type === 'hosta') && eventLocation === 'las vegas') {
            if (totalTime/60 > 8) {
              totalNormal = totalNormal + 8 * workTime.personnel;
              totalNormalOvertime = totalNormalOvertime + (totalTime/60 - 8) * workTime.personnel;
              totalPrice = totalPrice + priceRates.normalOvertime * workTime.personnel * (totalTime/60 - 8)
                + priceRates.normal * workTime.personnel * 8;
            } else {
              totalNormal = totalNormal + totalTime/60 * workTime.personnel;
              totalPrice = totalPrice + priceRates.normal * workTime.personnel * totalTime/60;
            }
          } else if ((workTime.type === 'hostB' || workTime.type === 'hostessB' || workTime.type === 'hostaB') && eventLocation === 'las vegas') {
            if (totalTime/60 > 8) {
              totalBil = totalBil + 8 * workTime.personnel;
              totalBilOvertime = totalBilOvertime + (totalTime/60 - 8) * workTime.personnel;
              totalPrice = totalPrice + priceRates.bilOvertime * workTime.personnel * (totalTime/60 - 8)
                + priceRates.bil * workTime.personnel * 8;
            } else {
              totalBil = totalBil + totalTime/60 * workTime.personnel;
              totalPrice = totalPrice + priceRates.bil * workTime.personnel * totalTime/60;
            }
          } else if ((workTime.type === 'host' || workTime.type === 'hostess' || workTime.type === 'hosta')) {
            if (totalNormal > 40) {
              totalNormal = totalNormal + 40 * workTime.personnel;
              totalNormalOvertime = totalNormalOvertime + (totalTime/60*7 - 40) * workTime.personnel;
              totalPrice = totalPrice + priceRates.normalOvertime * workTime.personnel * (totalTime/60*7 - 40)
                + priceRates.normal * workTime.personnel * 8;
            } else {
              totalNormal = totalNormal + totalTime/60 * workTime.personnel;
              totalPrice = totalPrice + priceRates.normal * workTime.personnel * totalTime/60;
            }
          } else {

          }
        }
      });
      if (totalPrice > 0) {
        template.totalNormal.set(totalNormal);
        template.totalNormalOvertime.set(totalNormalOvertime);
        template.totalBil.set(totalBil);
        template.totalBilOvertime.set(totalBilOvertime);
        template.totalPrice.set(totalPrice);
      }
    }
  },
  'submit form': function(event, template) {
    event.preventDefault();

    var priceRates = template.priceRates();
    var priceBreakDown = template.priceBreakDown();
    var assistantForm = {
      eventLocation: template.$('[name=eventLocation]').val(),
      eventName: template.$('[name=eventName]').val(),
      boothNumber: template.$('[name=boothNumber]').val(),
      eventDate: template.$('[name=eventDate]').val(),
      exhibitorName: template.$('[name=exhibitorName]').val(),
      contactNumber: template.$('[name=contactNumber]').val(),
      firstName1: template.$('[name=firstName1]').val(),
      lastName1: template.$('[name=lastName1]').val(),
      phone1: template.$('[name=phone1]').val(),
      firstName2: template.$('[name=firstName2]').val(),
      lastName2: template.$('[name=lastName2]').val(),
      phone2: template.$('[name=phone2]').val(),
      workTimes: template.workTime.get(),
      comments: template.$('[name=comments]').val(),
      paymentMethod: template.$('[name=paymentMethod]').val(),
      clothes: template.$('[name=clothes]').val(),
      totalNormal: template.totalNormal.get(),
      totalNormalOvertime: template.totalNormalOvertime.get(),
      totalBil: template.totalBil.get(),
      totalBilOvertime: template.totalBilOvertime.get(),
      priceRates: priceRates,
      priceBreakDown: priceBreakDown
    }

    var errors = validateAssistantForm(assistantForm);

    if (!$.isEmptyObject(errors)) {
      return Session.set('postSubmitErrors', errors)
    }

    Meteor.call('saveAssistantOrder', assistantForm, function(error,result) {
      if (error) {
        console.log(error);
      }
      Router.go('bookOrder', {_id: result._id});
    });

  }
});
