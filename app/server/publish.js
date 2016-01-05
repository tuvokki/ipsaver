Meteor.publish('iphits', function () {
  return Iphits.find({}, {
      limit: 10,
      sort: { date: -1}
    });
});