Template.Calendar.onRendered(function() {
  this.subscribe("futureEvents");
});

Template.Calendar.helpers({
  calendarOptions: {
    hiddenDays: [ 0 ],
    height: '500px',
    slotDuration: '01:00:00',
    minTime: '08:00:00',
    maxTime: '19:00:00',
    // Function providing events reactive computation for fullcalendar plugin
    events: function(start, end, timezone, callback) {
      //console.log(start);
      //console.log(end);
      //console.log(timezone);
      // Get only events from one document of the Calendars collection
      // events is a field of the Calendars collection document
      var eventCursor = Events.find();
      var events = eventCursor.fetch();
      callback(events);
    },
    autoruns: [
      function () {
        console.log("user defined autorun function executed!");
      }
    ]
  },
});

Template.Calendar.events({
  "click [data-action=register-event]": function() {
    if(Meteor.user()) {
      FlowRouter.go("register.event");
    } else {
      var view = Blaze.render(Template.LoginRequiredModal, document.body);
      var domRange = view._domrange;
      var loginRequiredModal = domRange.$('.modal');
      loginRequiredModal.modal();
    }
  }
});
