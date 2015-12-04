Template.billingInfo.helpers({
  expMonth: function() {
    return [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ]
  },
  expYear: function() {
    var curYear = moment().format('YYYY');
    var yearsArray = [];
    for (i = 0; i < 10; i++) {
      yearsArray.push(parseInt(curYear)+i);
    }
    return yearsArray;
  }
});
