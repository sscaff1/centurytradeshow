SSR.compileTemplate('careerHtml', Assets.getText('email-career.html'));
SSR.compileTemplate('securityEmail', Assets.getText('email-security-form.html'));
SSR.compileTemplate('staffingEmail', Assets.getText('email-staffing-form.html'));
SSR.compileTemplate('contactusEmail', Assets.getText('email-contactus.html'));

Template.securityEmail.helpers({
  displayCurrency(num) {
    return (Math.round(num * 100)/100).toFixed(2);
  },
  subTotalPriceBreakdown: function(id) {
    var order = Order.findOne(id);
    var armedHours = parseFloat(order.totalArmed);
    var unarmedHours = parseFloat(order.totalUnarmed);
    var armedPrice = parseFloat(order.priceRates.armed);
    var unarmedPrice = parseFloat(order.priceRates.unarmed);
    return {
      armed: armedHours*armedPrice,
      unarmed: unarmedHours*unarmedPrice
    }
  },
});

Template.staffingEmail.helpers({
  displayCurrency(num) {
    return (Math.round(num * 100)/100).toFixed(2);
  },
  subTotalPriceBreakdown: function(id) {
    var order = Order.findOne(id);
    var armedHours = parseFloat(order.totalArmed);
    var unarmedHours = parseFloat(order.totalUnarmed);
    var armedPrice = parseFloat(order.priceRates.armed);
    var unarmedPrice = parseFloat(order.priceRates.unarmed);
    return {
      armed: armedHours*armedPrice,
      unarmed: unarmedHours*unarmedPrice
    }
  },
});

Meteor.methods({
  sendCareerEmail(doc) {
    this.unblock();
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Career Application",
      html: SSR.render('careerHtml', doc),
    });
  },
  sendSecurityEmail(doc) {
    this.unblock();
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Security Request",
      html: SSR.render('securityEmail', doc),
    });
  },
  sendStaffingEmail(doc) {
    this.unblock();
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Staffing Request",
      html: SSR.render('staffingEmail', doc),
    });
  },
  sendContactUsEmail(doc) {
    this.unblock();
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Contact Us Inquiry",
      html: SSR.render('contactusEmail', doc),
    });
  },
});
