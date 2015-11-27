validateSecurityForm = function(security) {
  var errors = {};
  if (!security.eventLocation)
    errors.eventLocation = 'You must select a Century Office.';
  if ((security.eventLocation === 'new orleans' ||
    security.eventLocation === 'orlando') && !security.conventionCenter) {
      errors.conventionCenter = 'You must indicate yes or no.';
    }
    
  return errors;
}
