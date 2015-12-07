UI.registerHelper('errorMessage', function (field, fieldIndex) {
  if (fieldIndex.hash.fieldIndex) {
    field = field+fieldIndex.hash.fieldIndex;
    return Session.get('postSubmitErrors')[field];
  } else {
    return Session.get('postSubmitErrors')[field];
  }
});

UI.registerHelper('errorClass', function (field, fieldIndex) {
  if (fieldIndex.hash.fieldIndex) {
    field = field+fieldIndex.hash.fieldIndex;
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  } else {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

UI.registerHelper('displayCurrency', function(num) {
  return (Math.round(num * 100)/100).toFixed(2);
});

Template.layout.events({
  'click .navbar-collapse':function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $('.navbar-collapse').collapse('hide');
    }
  }
});
