Meteor.methods({
  sendCareerEmail(doc) {
    this.unblock();
    SSR.compileTemplate('careerHtml', Assets.getText('email-career.html'));
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Career Application",
      html: SSR.render('careerHtml', doc),
    });
  },
  sendSecurityEmail(doc) {
    this.unblock();
    SSR.compileTemplate('securityEmail', Assets.getText('email-security-form.html'));
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Security Request",
      html: SSR.render('securityEmail', doc),
    });
  },
  sendStaffingEmail(doc) {
    this.unblock();
    SSR.compileTemplate('staffingEmail', Assets.getText('email-staffing-form.html'));
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Staffing Request",
      html: SSR.render('staffingEmail', doc),
    });
  },
  sendContactUsEmail(doc) {
    this.unblock();
    SSR.compileTemplate('contactusEmail', Assets.getText('email-contactus.html'));
    Email.send({
      to: "sscaff1@gmail.com",
      from: "no-reply@centurytradeshow.com",
      subject: "New Contact Us Inquiry",
      html: SSR.render('contactusEmail', doc),
    });
  },
});
