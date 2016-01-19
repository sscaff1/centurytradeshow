Template.securityOrder.onCreated(function() {
  var instance = this;
  instance.totalPrice = new ReactiveVar(0);
  instance.totalArmed = new ReactiveVar(0);
  instance.totalUnarmed = new ReactiveVar(0);
  instance.incentiveDate = new ReactiveVar(null);
  instance.paymentMethod = new ReactiveVar(null);
  instance.loopWorkTimes = new ReactiveVar([{}]);
  instance.eventLocation = new ReactiveVar(null);
  instance.conventionCenter = new ReactiveVar(null);
  instance.priceRatesDetails = new ReactiveVar({
    armed: 0,
    unarmed: 0
  });
  Session.set('postSubmitErrors', {});
  instance.priceRates = function() {
    var eventDate = moment(instance.$('[name=eventDate]').val(),'MM/DD/YYYY');
    var today = moment().startOf('day');
    var daysToEvent = Math.round(moment.duration(eventDate-today).asDays());
    var eventLocation = instance.eventLocation.get();
    var priceRates = PriceRates.find({location: eventLocation});
    if (daysToEvent >= 21) {
      return {
        armed: priceRates.armedD,
        unarmed: priceRates.unarmedD,
        incentive: true
      }
    } else {
      return {
        armed: priceRates.armed,
        unarmed: priceRates.unarmed,
        incentive: false
      }
    }
  };
  instance.priceBreakDown = function() {
    var eventLocation = instance.eventLocation.get();
    var totalPrice = instance.totalPrice.get();
    var paymentMethod = instance.paymentMethod.get();
    if (paymentMethod === 'credit') {
      var ccRate = .03;
    } else {
      var ccRate = 0;
    }
    if (eventLocation === 'chicago') {
      var ccFee = totalPrice * ccRate;
      return {
        address: '6334 S Archer Ave. Suite B',
        cityState: 'Chicago, IL 60632',
        lic: '119.001474',
        ccFee: [
          {name: 'Credit Card Fee - 3%', value: ccFee}
        ],
        totalPrice: totalPrice + ccFee
      }
    } else if (eventLocation === 'las vegas') {
      var ccFee = totalPrice * ccRate;
      return {
        address: '4945 Wilbur St.',
        cityState: 'Las Vegas, NV 89119',
        lic: '1315',
        ccFee: [
          {name: 'Credit Card Fee - 3%', value: ccFee}
        ],
        totalPrice: totalPrice + ccFee
      }
    } else if (eventLocation === 'miami') {
      var salesTax = totalPrice * .07;
      var ccFee = totalPrice * 1.07 * ccRate;
      return {
        address: '7901 SW 24th St.',
        cityState: 'Miami, FL 33155',
        lic: 'B-2000104',
        fee: [
          {name: 'Florida State Sales Tax (Miami-Dade County) - 7%', value: salesTax}
        ],
        ccFee: [
          {name: 'Credit Card Fee - 3%', value: ccFee}
        ],
        totalPrice: totalPrice + ccFee + salesTax
      }
    } else if (eventLocation === 'nashville') {
      var ccFee = totalPrice * ccRate;
      return {
        address: '6421 Pinecastle Blvd. Suite 1',
        cityState: 'Orlando, FL  32809',
        lic: '12996',
        ccFee: [
          {name: 'Credit Card Fee - 3%', value: ccFee}
        ],
        totalPrice: totalPrice + ccFee
      }
    } else if (eventLocation === 'new orleans') {
      var conventionCenter = Template.instance().conventionCenter.get();
      if (conventionCenter === 'newOrleans') {
        var conventionFee = totalPrice * .02;
        var ccFee = totalPrice * 1.02 * ccRate;
      } else {
        var conventionFee = 0;
        var ccFee = totalPrice * ccRate;
      }
      return {
        address: '2601 N. Hullen St. Suite 227E',
        cityState: 'Metairie, LA 70002',
        lic: '790',
        fee: [
          {name: 'Ernest N. Morial C.C. Administration Fee - 2%', value: conventionFee}
        ],
        ccFee: [
          {name: 'Credit Card Fee - 3%', value: ccFee}
        ],
        totalPrice: totalPrice + ccFee + conventionFee
      }
    } else if (eventLocation === 'orlando') {
      var conventionCenter = Template.instance().conventionCenter.get();
      if (conventionCenter === 'orlando') {
        var conventionFee = totalPrice * .05;
        var salesTax = totalPrice * 1.05 * .065;
        var ccFee = totalPrice * 1.05 * 1.065 * ccRate;
      } else {
        var conventionFee = 0
        var salesTax = totalPrice * .065;
        var ccFee = totalPrice * 1.065 * ccRate;
      }
      return {
        address: '6421 Pinecastle Blvd. Suite 1',
        cityState: 'Orlando, FL  32809',
        lic: 'B-2000104',
        fee: [
          {name: 'Orange County C.C. Administration Fee - 5%', value: conventionFee},
          {name: 'Florida State Sales Tax (Orange County) - 6.5%', value: salesTax}
        ],
        ccFee: [
          {name: 'Credit Card Fee - 3%', value: ccFee}
        ],
        totalPrice: totalPrice + ccFee + conventionFee + salesTax
      }
    } else if (eventLocation === 'tucson') {
      var ccFee = totalPrice * ccRate;
      return {
        address: '5425 E Broadway Blvd.',
        cityState: 'Tucson, AZ 85711',
        lic: '1658251',
        ccFee: [
          {name: 'Credit Card Fee - 3%', value: ccFee}
        ],
        totalPrice: totalPrice + ccFee,
      }
    }
  }
});

Template.securityOrder.onRendered(function() {
  var instance = this;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY',
    widgetPositioning: {
      vertical: 'bottom'
    }
  });
  instance.totalPrice.set(0);
  instance.totalArmed.set(0);
  instance.totalUnarmed.set(0);
  instance.incentiveDate.set(null);
  instance.loopWorkTimes.set([{}]);
  instance.priceRatesDetails.set({
    armed: 0,
    unarmed: 0
  });
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
  },
  eventLocations: function() {
    return Locations.find();
  },
  conventionCenter: function() {
    var eventLocation = Template.instance().eventLocation.get();
    return {
      newOrleans: eventLocation === 'new orleans',
      orlando: eventLocation === 'orlando'
    }
  },
  eventLocation: function() {
    return Template.instance().priceBreakDown();
  },
  priceRates: function() {
    return Template.instance().priceRatesDetails.get();
  }
});

Template.securityOrder.events({
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
    template.loopWorkTimes.set(currentWorkTimes);
  },
  'blur .form-control': function(event, template) {
    event.preventDefault();

    var currentWorkTimes = template.loopWorkTimes.get();
    if (currentWorkTimes.length > 0) {
      var priceRates = Template.instance().priceRates();
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
            totalPrice = totalPrice + priceRates.armed * workTime.personnel * totalTime/60;
          } else {
            totalUnarmed = totalUnarmed + totalTime/60 * workTime.personnel;
            totalPrice = totalPrice + priceRates.unarmed * workTime.personnel * totalTime/60;
          }
        }
      });
      if (totalPrice > 0) {
        template.totalArmed.set(totalArmed);
        template.totalUnarmed.set(totalUnarmed);
        template.totalPrice.set(totalPrice);
        template.priceRatesDetails.set(priceRates);
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
  },
  'submit form': function(event, template) {
    event.preventDefault();
    var priceBreakDown = template.priceBreakDown();
    var priceRates = template.priceRates();
    var conventionCenter;
    if (template.$('[name=conventionCenter]').val() === 'false') {
      conventionCenter = false;
    } else if (template.$('[name=conventionCenter]').val() === 'newOrleans') {
      conventionCenter = 'Ernest N. Morial Convention Center';
    } else if (template.$('[name=conventionCenter]').val() === 'orlando') {
      conventionCenter = 'Orange County Convention Center';
    }
    var securityForm = {
      eventLocation: template.$('[name=eventLocation]').val(),
      conventionCenter: conventionCenter,
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
      workTimes: template.loopWorkTimes.get(),
      comments: template.$('[name=comments]').val(),
      paymentMethod: template.$('[name=paymentMethod]').val(),
      totalArmed: template.totalArmed.get(),
      totalUnarmed: template.totalUnarmed.get(),
      priceBreakDown: priceBreakDown,
      priceRates: priceRates
    }

    var errors = validateSecurityForm(securityForm);

    if (!$.isEmptyObject(errors)) {
      return Session.set('postSubmitErrors', errors)
    }

    Meteor.call('saveSecurityOrder', securityForm, function(error,result) {
      if (error) {
        console.log(error);
      }
      Router.go('bookOrder', {_id: result._id});
    });
  }
});
