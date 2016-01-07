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
  },
  owner: {
    type: String,
    autoValue: function() {
      if (Meteor.userId())
        return Meteor.userId();
      else
        return "Anonymous"
    }
  },
  username: {
    type: String,
    autoValue: function() {
      if (Meteor.userId())
        return Meteor.user().username;
      else
        return "none"
    }
  }
}));

if (Meteor.isServer) {
  Iphits.allow({
    insert: function (userId, doc) {
      // Make sure the user is logged in before inserting an ip-hit
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      // admin can do everything
      if (Meteor.user().username == 'admin')
        return true;
      // Make sure the logged in user is owner before updating an ip-hit
      if (userId != doc.owner) {
        throw new Meteor.Error("not-authorized", "You are not the owner of this ip-hit.");
      }
      return true;
    },

    remove: function (userId, doc) {
      // admin can do everything
      if (Meteor.user().username == 'admin')
        return true;
      // Make sure the logged in user is owner before removing an ip-hit
      if (userId != doc.owner) {
        throw new Meteor.Error("not-authorized", "You are not the owner of this ip-hit.");
      }
      return true;
    }
  });
}
