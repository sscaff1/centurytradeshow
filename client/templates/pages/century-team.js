Template.centuryTeam.helpers({
  employeeOrlando: function() {
    return Employees.find({company: 'orlando'});
  },
  employeeVegas: function() {
    return Employees.find({company: 'vegas'});
  }
})
