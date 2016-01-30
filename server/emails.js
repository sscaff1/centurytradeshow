SSR.compileTemplate('careerHtml', Assets.getText('email-career.html'));
SSR.compileTemplate('securityEmail', Assets.getText('email-security-form.html'));
SSR.compileTemplate('staffingEmail', Assets.getText('email-staffing-form.html'));
SSR.compileTemplate('contactusEmail', Assets.getText('email-contactus.html'));

Template.securityEmail.helpers({
  displayCurrency(num) {
    return (Math.round(num * 100)/100).toFixed(2);
  },
  multiplyHelper(param1, param2) {
    return parseFloat(param1)*parseFloat(param2);
  },
});

Template.staffingEmail.helpers({
  displayCurrency(num) {
    return (Math.round(num * 100)/100).toFixed(2);
  },
  multiplyHelper(param1, param2) {
    return parseFloat(param1)*parseFloat(param2);
  },
});

Meteor.methods({
  sendCareerEmail(doc) {
    this.unblock();
    Email.send({
      to: "info@centurytradeshow.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Career Application",
      html: SSR.render('careerHtml', doc),
    });
  },
  sendSecurityEmail(doc) {
    this.unblock();
    var toAddress = [doc.email, 'info@centurytradeshow.com'];
    Email.send({
      to: _.flatten(toAddress),
      from: "no-reply@centurytradeshow.com",
      subject: "New Security Request",
      html: SSR.render('securityEmail', doc),
    });
  },
  sendStaffingEmail(doc) {
    this.unblock();
    var toAddress = [doc.email, 'info@centurytradeshow.com'];
    Email.send({
      to: _.flatten(toAddress),
      from: "no-reply@centurytradeshow.com",
      subject: "New Staffing Request",
      html: SSR.render('staffingEmail', doc),
    });
  },
  sendContactUsEmail(doc) {
    this.unblock();
    Email.send({
      to: "info@centurytradeshow.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Contact Us Inquiry",
      html: SSR.render('contactusEmail', doc),
    });
  },
});
