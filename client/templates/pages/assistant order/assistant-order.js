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
      return {
        selected: false
      }
    }
  }
});

Template.assistantOrder.onRendered(function() {
  let instance = this;
  const currentData = instance.data;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY',
    widgetPositioning: {
      vertical: 'bottom'
    }
  });
  if (Router.current().route.getName() !== 'assistantOrder') {
    instance.workTime.set(currentData.workTimes);
    instance.totalNormal.set(currentData.totalNormal);
    instance.totalNormalOvertime.set(currentData.totalNormalOvertime);
    instance.totalBil.set(currentData.totalBil);
    instance.totalBilOvertime.set(currentData.totalBilOvertime);
    instance.paymentMethod.set(currentData.paymentMethod);
    instance.eventLocation.set(currentData.eventLocation);
  }
});

Template.assistantOrder.helpers({
  eventLocations: function() {
    return Locations.find();
  },
  workTimes: function() {
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
  },
  dressTypes() {
    return [
      {value: 'Business Casual', label: 'Business Casual'},
      {value: 'Professional Attire', label: 'Professional Attire'},
      {value: 'Client to Provide', label: 'Client to Provide'},
      {value: 'To be Determined', label: 'To be Determined'}
    ]
  },
  matchesDressType(value, setType) {
    return value === setType;
  },
  matchesCurrentLocation(location) {
    return Template.instance().eventLocation.get() === location;
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
  'change [name=eventLocation]': function(event, template) {
    template.eventLocation.set($(event.target).val());
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
      var newWorkTimes = [];
      _.each(currentWorkTimes, function(workTime) {
        var startTime = moment(workTime.startTime, 'MM-DD-YYYY H:mm A');
        var endTime = moment(workTime.endTime, 'MM-DD-YYYY H:mm A');
        var totalTime = endTime.diff(startTime, 'minutes');
        newWorkTimes.push(_.extend(workTime, {
          week: startTime.week(),
          dayOfYear: endTime.dayOfYear(),
          totalTime: totalTime
        }));
      });
      var groupByDay = _.groupBy(newWorkTimes,(workTime) => { return workTime.dayOfYear });
      var groupByWeek = _.groupBy(newWorkTimes,(workTime) => { return workTime.week });
      if (eventLocation === 'las vegas') {
        _.map(groupByDay, (days, key) => {
          var totalTimeDay = 0;
          var totalTimeDayB = 0;
          _.each(days, (day) => {
            if (day.totalTime) {
              if (day.type === 'host' || day.type === 'hostess' || day.type === 'hosta') {
                totalTimeDay = totalTimeDay + day.totalTime / 60
                if (totalTimeDay > 8) {
                  totalNormal = totalNormal + 8 * day.personnel;
                  totalNormalOvertime = totalNormalOvertime + (totalTimeDay - 8) * day.personnel;
                } else {
                  totalNormal = totalNormal + day.totalTime / 60 * day.personnel;
                }
              } else {
                totalTimeDayB = totalTimeDayB + day.totalTime / 60
                if (totalTimeDayB > 8) {
                  totalBil = totalBil + 8 * day.personnel;
                  totalBilOvertime = totalBilOvertime + (totalTimeDayB - 8) * day.personnel;
                } else {
                  totalBil = totalBil + day.totalTime / 60 * day.personnel;
                }
              }
            }
          })
        });
        _.map(groupByWeek, (weeks, key) => {
          var totalTimeWeek = 0;
          var totalTimeWeekB = 0;
          _.each(weeks, (week) => {
            if (week.totalTime) {
              if (week.type === 'host' || week.type === 'hostess' || week.type === 'hosta') {
                totalTimeWeek = totalTimeWeek + week.totalTime / 60
                if (totalTimeWeek > 40) {
                  totalNormal = totalNormal - (totalTimeWeek - 40) * week.personnel;
                  totalNormalOvertime = totalNormalOvertime + (totalTimeWeek - 40) * week.personnel;
                }
              } else {
                totalTimeWeekB = totalTimeWeekB + week.totalTime / 60
                if (totalTimeWeekB > 40) {
                  totalBil = totalBil - (totalTimeWeekB - 40) * week.personnel;
                  totalBilOvertime = totalBilOvertime + (totalTimeWeekB - 40) * week.personnel;
                }
              }
            }
          })
        });
      } else {
        _.map(groupByWeek, (weeks, key) => {
          var totalTimeWeek = 0;
          var totalTimeWeekB = 0;
          _.each(weeks, (week) => {
            if (week.totalTime) {
              if (week.type === 'host' || week.type === 'hostess' || week.type === 'hosta') {
                totalTimeWeek = totalTimeWeek + week.totalTime / 60
                if (totalTimeWeek > 40) {
                  totalNormal = totalNormal + 40 * week.personnel;
                  totalNormalOvertime = totalNormalOvertime + (totalTimeWeek - 40) * week.personnel;
                } else {
                  totalNormal = totalNormal + week.totalTime / 60 * week.personnel;
                }
              } else {
                totalTimeWeekB = totalTimeWeekB + week.totalTime / 60
                if (totalTimeWeekB > 40) {
                  totalBil = totalBil + 40 * week.personnel;
                  totalBilOvertime = totalBilOvertime + (totalTimeWeekB - 40) * week.personnel;
                } else {
                  totalBil = totalBil + week.totalTime / 60 * week.personnel;
                }
              }
            }
          })
        });
      }
      totalPrice = totalNormal * priceRates.normal + totalNormalOvertime * priceRates.normalOvertime +
        totalBil * priceRates.bil + totalBilOvertime * priceRates.bilOvertime;
        console.log(totalPrice);
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
      } else {
        Router.go('bookOrder', {_id: result._id});
      }
    });

  }
});
