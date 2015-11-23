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
