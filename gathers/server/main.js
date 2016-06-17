import { Meteor } from 'meteor/meteor';

import { AccountsCommon } from 'meteor/accounts-base'

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


Accounts.onLogin(function(steamID){
  console.log(steamID)
});

Meteor.startup(() => {

  if (Meteor.isServer) {
    Meteor.methods({
        checkSteam: function (steamID) {
            this.unblock();
            return Meteor.http.call("GET", "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=BC48645A4E6E32C76BB4012F958EF147&steamids=" + steamID);
        }
    });
}

  // code to run on server at startup
});
