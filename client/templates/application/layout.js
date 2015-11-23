Template.layout.helpers({
  notHome: function() {
    if (Router.current().route.getName() !== 'home') {
      return true;
    } else {
      return false;
    }
  }
})
