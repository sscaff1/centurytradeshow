Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',
  layoutTemplate: 'layoutHome'
});

Router.route('/about-us', {name: 'aboutUs'});

Router.route('/century-team', {
  name: 'centuryTeam'
});

Router.route('/services', {
  name: 'services'
});

Router.route('/portfolio', {name: 'portfolio'});

Router.route('/resources', {name: 'resources'});

Router.route('/security-order', {
  name: 'securityOrder',
});

Router.route('/assistant-order', {
  name: 'assistantOrder',
});

Router.route('/careers', {
  name: 'careers',
});

Router.route('/booth-camera', {name: 'boothCamera'});

Router.route('/william-callaghan', {name: 'inMemoriam'});

Router.route('/contact-us-office-locations', {name: 'contactUs'});

Router.route('/book-order/:_id', {
  name: 'bookOrder',
  waitOn() {
    return [
      Meteor.subscribe('orders', this.params._id),
    ]
  },
  data() {
    return Orders.findOne(this.params._id);
  }
});

Router.route('/edit/security/:_id', function() {
  this.render('securityOrder');
}, {
  name: 'editSecurityOrder',
  waitOn() {
    return [
      Meteor.subscribe('orders', this.params._id),
    ]
  },
  data() {
    return Orders.findOne(this.params._id);
  }
});

Router.route('/edit/assistant/:_id', function() {
  this.render('assistantOrder');
}, {
  name: 'editAssistantOrder',
  waitOn() {
    return [
      Meteor.subscribe('orders', this.params._id),
    ]
  },
  data() {
    return Orders.findOne(this.params._id);
  }
});
