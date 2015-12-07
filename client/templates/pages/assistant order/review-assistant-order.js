Template.reviewAssistantOrder.helpers({
  subTotalPriceBreakdown: function() {
    var order = this.order;
    var normal = parseFloat(order.totalNormal);
    var normalOvertime = parseFloat(order.totalNormalOvertime);
    var bil = parseFloat(order.totalBil);
    var bilOvertime = parseFloat(order.totalBilOvertime);
    var normalRate = parseFloat(order.priceRates.normal);
    var normalOvertimeRate = parseFloat(order.priceRates.normalOvertime);
    var bilRate = parseFloat(order.priceRates.bil);
    var bilOvertimeRate = parseFloat(order.priceRates.bilOvertime);
    return {
      normal: normal*normalRate,
      normalOvertime: normalOvertimeRate*normalOvertime,
      bil: bil*bilRate,
      bilOvertime: bilOvertimeRate*bilOvertime
    }
  },
  incentiveDate: function() {
    var eventDate = this.order.eventDate;
    eventDate = moment(eventDate, 'MM/DD/YYYY');
    return eventDate.subtract(21, 'days').format('MM/DD/YYYY');
  },
  hostType: function() {
    if (this.type === 'host') {
      return 'non-billingual assistants';
    } else {
      return 'billingual assistants';
    }
  }
});
