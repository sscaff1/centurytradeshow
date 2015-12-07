validateCommon = function(security) {
  var errors = {};

  var eventDate = moment(security.eventDate,'MM/DD/YYYY').startOf('day');
  if (!security.eventLocation)
    errors.eventLocation = 'You must select a Century Office.';
  if (!security.eventName)
    errors.eventName = 'You must provide an event name.';
  if (!security.eventDate)
    errors.eventDate = 'The first event date is required.';
  if (!security.exhibitorName)
    errors.exhibitorName = 'You must prodvide an exhibitor\'s name.';
  if (!security.contactNumber)
    errors.contactNumber = 'You must provide a contact number.';
  if (!security.firstName1)
    errors.firstName1 = 'You must provide at least one on-site contact.';
  if (!security.lastName1)
    errors.lastName1 = 'You must provide at least one on-site contact.';
  if (!security.phone1)
    errors.phone1 = 'You must provide at least one on-site contact.';
  if (!security.paymentMethod)
    errors.paymentMethod = 'You must select a payment method.';
  _.each(security.workTimes, function(workTime) {
    var startTime = moment(workTime.startTime, 'MM-DD-YYYY H:mm A');
    var endTime = moment(workTime.endTime, 'MM-DD-YYYY H:mm A');
    var totalTime = endTime.diff(startTime, 'minutes');
    var daysToEvent = startTime.diff(eventDate, 'days');
    if (workTime !== {}) {
      if (!workTime.type || isNaN(workTime.personnel) || !workTime.booth || !workTime.startTime || !workTime.endTime) {
        errors.workTime = 'You did not fill in one of the fields below.';
      } else if (totalTime <= 0) {
        errors.workTime = 'One of your start times is after your end time.';
      } else if (daysToEvent < 0) {
        errors.workTime = 'One of your start times is before your initial event date.';
      }
    }
  });

  return errors;
}

validateSecurityForm = function(security) {
  var errors = validateCommon(security);

  if ((security.eventLocation === 'new orleans' ||
    security.eventLocation === 'orlando') &&
    (security.conventionCenter === 'undefined' ||
    security.conventionCenter === 'null')) {
      errors.conventionCenter = 'You must indicate yes or no.';
    }

  return errors;
}

validateAssistantForm = function(security) {
  var errors = validateCommon(security);

  if (!security.clothes)
    errors.clothes = 'You must select one of the options.'

  return errors;
}

validateCareerForm = function(career) {
  var errors = {};
  for (var prop in career) {
    if (career.hasOwnProperty(prop)) {
      if (!career[prop]) {
        errors[prop] = 'You  must fill out this field or select a value.';
      }
    }
  }
  return errors;
}

validateBillingAddress = function(address) {
  var errors = {};
  if (!address.name)
    errors.lastName = 'You must supply your name.';
  if (!address.email)
    errors.email = 'You must supply an email.';
  if (!address.address)
    errors.address = 'You must provide your billing address.';
  if (!address.city)
    errors.city = 'You must provide your billing address.';
  if (!address.state)
    errors.state = 'You must provide your billing address.';
  if (!address.zipCode)
    errors.zipCode = 'You must provide your billing address.';
  return errors;
}
