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
  instance.eventLocation = new ReactiveVar(null);
  instance.conventionCenter = new ReactiveVar(null);
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
    return (Template.instance().totalPrice.get()*100)/100;
  },
  dateMinus21: function() {
    return Template.instance().incentiveDate.get();
  },
  totalArmed: function() {
    return (Template.instance().totalArmed.get()).toFixed(2);
  },
  totalUnarmed: function() {
    return (Template.instance().totalUnarmed.get()).toFixed(2);
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
  },
  eventLocations: function() {
    return [
      {label: "Chicago", value: "chicago"},
      {label: "Las Vegas", value: "las vegas"},
      {label: "Miami ", value: "miami"},
      {label: "Nashville", value: "nashville"},
      {label: "New Orleans", value: "new orleans"},
      {label: "Orlando", value: "orlando"},
      {label: "Tucson", value: "tucson"},
    ];
  },
  conventionCenter: function() {
    var eventLocation = Template.instance().eventLocation.get();
    return {
      newOrleans: eventLocation === 'new orleans',
      orlando: eventLocation === 'orlando'
    }
  },
  eventLocation: function() {
    var eventLocation = Template.instance().eventLocation.get();
    var totalPrice = Template.instance().totalPrice.get();

    if (eventLocation === 'chicago') {
      var ccFee = Math.round(totalPrice * .03 * 100)/100;
      return {
        address: '6334 S Archer Ave. Suite B',
        cityState: 'Chicago, IL 60632',
        lic: '119.001474',
        ccFee: [
          {name: 'Credit Card Fee (3%)', value: ccFee}
        ],
        totalPriceCC: totalPrice + ccFee,
        totalPrice: totalPrice
      }
    } else if (eventLocation === 'las vegas') {
      var ccFee = Math.round(totalPrice * .03 * 100)/100;
      return {
        address: '4945 Wilbur St.',
        cityState: 'Las Vegas, NV 89119',
        lic: '1315',
        ccFee: [
          {name: 'Credit Card Fee (3%)', value: ccFee}
        ],
        totalPriceCC: totalPrice + ccFee,
        totalPrice: totalPrice
      }
    } else if (eventLocation === 'miami') {
      var salesTax = Math.round(totalPrice * .07 * 100)/100;
      var ccFee = Math.round(totalPrice * 1.07 * .03 * 100)/100;
      return {
        address: '7901 SW 24th St.',
        cityState: 'Miami, FL 33155',
        lic: 'B-2000104',
        fee: [
          {name: 'Miami-Dade County Sales Tax (7%)', value: salesTax}
        ],
        ccFee: [
          {name: 'Credit Card Fee (3%)', value: ccFee}
        ],
        totalPriceCC: totalPrice + ccFee + salesTax,
        totalPrice: totalPrice + salesTax
      }
    } else if (eventLocation === 'nashville') {
      var ccFee = Math.round(totalPrice * .03 * 100)/100;
      return {
        address: '6421 Pinecastle Blvd. Suite 1',
        cityState: 'Orlando, FL  32809',
        lic: '12996',
        ccFee: [
          {name: 'Credit Card Fee (3%)', value: ccFee}
        ],
        totalPriceCC: totalPrice + ccFee,
        totalPrice: totalPrice
      }
    } else if (eventLocation === 'new orleans') {
      var conventionCenter = Template.instance().conventionCenter.get();
      if (conventionCenter === 'newOrleans') {
        var conventionFee = Math.round(totalPrice * .02 * 100)/100;
        var ccFee = Math.round(totalPrice * 1.02 * .03 * 100)/100;
      } else {
        var conventionFee = 0;
        var ccFee = Math.round(totalPrice * .03 * 100)/100;
      }
      return {
        address: '2601 N. Hullen St. Suite 227E',
        cityState: 'Metairie, LA 70002',
        lic: '790',
        fee: [
          {name: 'Ernest N. Morial C.C. Administration Fee (2%)', value: conventionFee}
        ],
        ccFee: [
          {name: 'Credit Card Fee (3%)', value: ccFee}
        ],
        totalPriceCC: totalPrice + ccFee + conventionFee,
        totalPrice: totalPrice + conventionFee,
      }
    } else if (eventLocation === 'orlando') {
      var conventionCenter = Template.instance().conventionCenter.get();
      if (conventionCenter === 'orlando') {
        var conventionFee = Math.round(totalPrice * .05 * 100)/100;
        var salesTax = Math.round(totalPrice * 1.05 * .065 * 100)/100;
        var ccFee = Math.round(totalPrice * 1.05 * 1.065 * .03 * 100)/100;
      } else {
        var conventionFee = 0
        var salesTax = Math.round(totalPrice * .065 * 100)/100;
        var ccFee = Math.round(totalPrice * 1.065 * .03 * 100)/100;
      }
      return {
        address: '6421 Pinecastle Blvd. Suite 1',
        cityState: 'Orlando, FL  32809',
        lic: 'B-2000104',
        fee: [
          {name: 'Orange County C.C. Administration Fee (5%)', value: conventionFee},
          {name: 'Orange County Sales Tax (6.5%)', value: salesTax}
        ],
        ccFee: [
          {name: 'Credit Card Fee (3%)', value: ccFee}
        ],
        totalPriceCC: totalPrice + ccFee + conventionFee + salesTax,
        totalPrice: totalPrice + conventionFee + salesTax,
      }
    } else if (eventLocation === 'tucson') {
      var ccFee = Math.round(totalPrice * .03 * 100)/100;
      return {
        address: '5425 E Broadway Blvd.',
        cityState: 'Tucson, AZ 85711',
        lic: '1658251',
        ccFee: [
          {name: 'Credit Card Fee (3%)', value: ccFee}
        ],
        totalPriceCC: totalPrice + ccFee,
        totalPrice: totalPrice + salesTax
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
      template.$('.datetimepicker').datetimepicker({
        sideBySide: true,
        showClose: true
      });
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
        var totalTime = endTime.diff(startTime, 'minutes');
        if (totalTime > 0) {
          if (workTime.type === 'armed') {
            totalArmed = totalArmed + totalTime/60 * workTime.personnel;
            totalPrice = totalPrice + armed * workTime.personnel * totalTime/60;
          } else {
            totalUnarmed = totalUnarmed + totalTime/60 * workTime.personnel;
            totalPrice = totalPrice + unarmed * workTime.personnel * totalTime/60;
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
  'blur [name=eventDate]': function(event, template) {
    var eventDate = moment(template.$('[name=eventDate]').val(),'MM/DD/YYYY');
    template.incentiveDate.set(eventDate.subtract(21, 'days').format('MM/DD/YYYY'));
  },
  'change [name=paymentMethod]': function(event,template) {
    template.paymentMethod.set(template.$(event.target).val());
  },
  'change [name=eventLocation]': function(event, template) {
    template.eventLocation.set($(event.target).val());
  },
  'change [name=conventionCenter]': function(event, template) {
    template.conventionCenter.set($(event.target).val());
  }
});
