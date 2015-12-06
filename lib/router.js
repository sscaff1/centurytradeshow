Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/about-us', {name: 'aboutUs'});
Router.route('/century-team', {name: 'centuryTeam'});
Router.route('/services', {name: 'services'});
Router.route('/portfolio', {name: 'portfolio'});
Router.route('/resources', {name: 'resources'});
Router.route('/security-order', {name: 'securityOrder'});
Router.route('/assistant-order', {name: 'assistantOrder'});
Router.route('/careers', {name: 'careers'});
Router.route('/booth-camera', {name: 'boothCamera'});
Router.route('/william-callaghan', {name: 'inMemoriam'});
Router.route('/contact-us-office-locations', {name: 'contactUs'});
Router.route('/book-order/:_id', {
  name: 'bookOrder',
  data: function() {
    return Orders.findOne(this.params._id);
  }
});
