Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'home'});

Router.route('/about-us', {name: 'aboutUs'});

Router.route('/century-team', {
  name: 'centuryTeam',
  waitOn() {
    return Meteor.subscribe('employees');
  }
});

Router.route('/services', {
  name: 'services',
  waitOn() {
    return Meteor.subscribe('services');
  }
});

Router.route('/portfolio', {name: 'portfolio'});

Router.route('/resources', {name: 'resources'});

Router.route('/security-order', {
  name: 'securityOrder',
  waitOn() {
    return [
      Meteor.subscribe('locations'),
      Meteor.subscribe('priceRates')
    ]
  }
});

Router.route('/assistant-order', {
  name: 'assistantOrder',
  waitOn() {
    return [
      Meteor.subscribe('locations'),
      Meteor.subscribe('priceRates')
    ]
  }
});

Router.route('/careers', {
  name: 'careers',
  waitOn() {
    return [
      Meteor.subscribe('locations'),
      Meteor.subscribe('states')
    ]
  }
});

Router.route('/booth-camera', {name: 'boothCamera'});

Router.route('/william-callaghan', {name: 'inMemoriam'});

Router.route('/contact-us-office-locations', {name: 'contactUs'});

Router.route('/book-order/:_id', {
  name: 'bookOrder',
  waitOn() {
    return [
      Meteor.subscribe('orders', this.params._id),
      Meteor.subscribe('states')
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
      Meteor.subscribe('states'),
      Meteor.subscribe('priceRates'),
      Meteor.subscribe('locations')
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
      Meteor.subscribe('states'),
      Meteor.subscribe('priceRates'),
      Meteor.subscribe('locations')
    ]
  },
  data() {
    return Orders.findOne(this.params._id);
  }
});
