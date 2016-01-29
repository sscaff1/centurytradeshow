Template.careers.onCreated(function() {
  var instance = this;
  instance.guardCard = new ReactiveVar(null);
  instance.nationalGuard = new ReactiveVar(null);
  instance.law = new ReactiveVar(null);
  instance.workExperience = new ReactiveVar([{value: 1}]);
  instance.fillOut = new ReactiveVar(null);
  instance.armedForces = new ReactiveVar(null);
  Session.set('postSubmitErrors', {});
});

Template.careers.onRendered(function() {
  var instance = this;
  instance.$('.datepicker').datetimepicker({
    format: 'MM/DD/YYYY',
    widgetPositioning: {
      vertical: 'bottom'
    }
  });
});

Template.careers.helpers({
  referenceCount: function() {
    return [
      {
        header: 'Please list two references other than relatives or previous employers.',
        index: '1'
      },
      {
        header: '&nbsp;',
        index: '2'
      },
    ]
  },
  guardCard: function() {
    var reactiveVal = Template.instance().guardCard.get();
    if (reactiveVal === 'yes') {
      return true;
    } else {
      return false;
    }
  },
  armedForces: function() {
    var reactiveVal = Template.instance().armedForces.get();
    if (reactiveVal === 'yes') {
      return true;
    } else {
      return false;
    }
  },
  nationalGuard: function() {
    var reactiveVal = Template.instance().nationalGuard.get();
    if (reactiveVal === 'yes') {
      return true;
    } else {
      return false;
    }
  },
  law: function() {
    var reactiveVal = Template.instance().law.get();
    if (reactiveVal === 'yes') {
      return true;
    } else {
      return false;
    }
  },
  workExperience: function() {
    return Template.instance().workExperience.get();
  },
  fillOut: function() {
    var reactiveVal = Template.instance().fillOut.get();
    if (reactiveVal === 'no') {
      return true;
    } else {
      return false;
    }
  }
});

Template.careers.events({
  'change [name=guardCard]': function(event,template) {
    event.preventDefault();
    var targetVal = $(event.target).val();
    template.guardCard.set(targetVal);
  },
  'change [name=nationalGuard]': function(event,template) {
    event.preventDefault();
    var targetVal = $(event.target).val();
    template.nationalGuard.set(targetVal);
  },
  'change [name=law]': function(event,template) {
    event.preventDefault();
    var targetVal = $(event.target).val();
    template.law.set(targetVal);
  },
  'change [name=fillOut]': function(event, template) {
    event.preventDefault();
    var targetVal = $(event.target).val();
    template.fillOut.set(targetVal);
  },
  'change [name=armedForces]': function(event,template) {
    event.preventDefault();
    var targetVal = $(event.target).val();
    template.armedForces.set(targetVal);
  },
  'click #moreEmployment': function(event,template) {
    event.preventDefault();
    var workExperience = template.workExperience.get();
    var lastValue = workExperience[workExperience.length-1].value;
    lastValue++;
    workExperience.push({value: lastValue});
    template.workExperience.set(workExperience);
  },
  'submit form': function(event,template) {
    event.preventDefault();

    var fields = template.findAll('.form-control');
    var employment = fields.map((field) => {
      field = $(field)
      return {
        name: field.attr('name'),
        value: field.val(),
        required: field.attr('required'),
        type: field.attr('data-employer') || 'document',
      }
    });
    var errors = validateCareerForm(employment);
    if (!$.isEmptyObject(errors)) {
      return Session.set('postSubmitErrors', errors)
    }
    var employers = [];
    var employHistories = template.findAll('[name=experience]');
    _.each(employHistories, function(history) {
      var employValues = {
        employerName: $(history).find('[name^=employerName]').val(),
        startDate: $(history).find('[name^=startDate]').val(),
        endDate: $(history).find('[name^=endDate]').val(),
        lastSupervisor: $(history).find('[name^=lastSupervisor]').val(),
        lastTitle: $(history).find('[name^=lastTitle]').val(),
        startPay: $(history).find('[name^=startPay]').val(),
        endPay: $(history).find('[name^=endPay]').val(),
        address: $(history).find('[name^=address]').val(),
        city: $(history).find('[name^=city]').val(),
        state: $(history).find('[name^=state]').val(),
        zipCode: $(history).find('[name^=zipCode]').val(),
        leaving: $(history).find('[name^=leaving]').val(),
      }
      employers.push(employValues);
    });
    var employmentDoc = {};
    for (let i = 0; i < employment.length; i++) {
      if (employment[i].type != 'employ') {
        employmentDoc[employment[i].name] = employment[i].value;
      }
    }
    employmentDoc.employers = employers;
    Meteor.call('insertApplication', employmentDoc, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        Router.go('home');
        Messages.throw('Your application has been submitted. Thank you for your interest.', 'success');
      }
    });
  }
})
