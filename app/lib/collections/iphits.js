Iphits = new Mongo.Collection('iphits');

Iphits.attachSchema(new SimpleSchema({
  host: {
    type: String,
    label: "host",
    max: 100,
    optional: false
  },
  ip: {
    type: String,
    label: "ip",
    max: 100,
    optional: false
  },
  msg: {
    type: String,
    label: "msg",
    max: 100,
    optional: false
  }
}));

if (Meteor.isServer) {
  Iphits.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
