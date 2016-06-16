import { Meteor } from 'meteor/meteor';

// Load tasks table from database
import '../imports/api/tasks.js';

if(Meteor.isServer) {
  Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
      { service: 'steam' },
      {
        $set: {
          loginStyle: 'redirect',
          timeout: 10000 // 10 seconds
        }
      }
    );
  });
}

Meteor.startup(() => {

  // code to run on server at startup
});
