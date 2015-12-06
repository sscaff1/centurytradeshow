validateSecurityForm = function(security) {
  var errors = {};
  var eventDate = moment(security.eventDate,'MM/DD/YYYY').startOf('day');

  if (!security.eventLocation)
    errors.eventLocation = 'You must select a Century Office.';
  if ((security.eventLocation === 'new orleans' ||
    security.eventLocation === 'orlando') && !security.conventionCenter) {
      errors.conventionCenter = 'You must indicate yes or no.';
    }
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
  if (!security.paymentMethod)
    errors.paymentMethod = 'You must select a payment method.';

  return errors;
}
