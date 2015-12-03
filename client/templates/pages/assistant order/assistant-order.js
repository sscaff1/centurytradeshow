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
  Session.set('postSubmitErrors', {});
});

Template.assistantOrder.onRendered(function() {
  var instance = this;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY'
  });
});

Template.assistantOrder.helpers({
  displayCurrency: function(num) {
    return (Math.round(num * 100)/100).toFixed(2);
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
    var paymentMethod = Template.instance().paymentMethod.get();
    var totalPrice = Template.instance().totalPrice.get();
    if (paymentMethod === 'credit') {
      return {
        credit: true,
        ccFee: totalPrice * .03,
        finalPrice: totalPrice * 1.03,
        selected: true
      }
    } else if (paymentMethod === 'noncredit') {
      return {
        noncredit: true,
        selected: true
      }
    } else {
      return false;
    }
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
      var eventDate = moment(template.$('[name=eventDate]').val(),'MM/DD/YYYY');
      var today = moment().startOf('day');
      var daysToEvent = Math.round(moment.duration(eventDate-today).asDays());
      var normal; var bil; var normalOvertime; var bilOvertime;
      if (daysToEvent >= 21) {
        normal = 25;
        bil = 30;
        normalOvertime = 37.50;
        bilOvertime = 45;
      } else {
        normal = 31;
        bil = 36;
        normalOvertime = 46.50;
        bilOvertime = 54;
      }
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
          if (workTime.type === 'host' || workTime.type === 'hostess') {
            if (totalTime/60 > 8) {
              totalNormal = totalNormal + 8 * workTime.personnel;
              totalNormalOvertime = totalNormalOvertime + (totalTime/60 - 8) * workTime.personnel;
              totalPrice = totalPrice + normalOvertime * workTime.personnel * (totalTime/60 - 8)
                + normal * workTime.personnel * 8;
            } else {
              totalNormal = totalNormal + 8 * workTime.personnel;
              totalPrice = totalPrice + normal * workTime.personnel * totalTime/60;
            }
          } else {
            if (totalTime/60 > 8) {
              totalBil = totalBil + 8 * workTime.personnel;
              totalBilOvertime = totalBilOvertime + (totalTime/60 - 8) * workTime.personnel;
              totalPrice = totalPrice + bilOvertime * workTime.personnel * (totalTime/60 - 8)
                + bil * workTime.personnel * 8;
            } else {
              totalBil = totalBil + 8 * workTime.personnel;
              totalPrice = totalPrice + bil * workTime.personnel * totalTime/60;
            }
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
});
