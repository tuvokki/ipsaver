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
    optional: false
  },
  msg: {
    type: String,
    label: "msg",
    max: 100,
    optional: false
  },
  date: {
    type: Number,
    label: 'date',
    optional: true,
    autoValue:function(){
      var date = Date.now();
      return date;
    }
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
