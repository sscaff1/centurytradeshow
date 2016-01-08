Template.centuryTeam.helpers({
  employees: function() {
    return Employees.find({},{sort:{order:1}});
  }
})
