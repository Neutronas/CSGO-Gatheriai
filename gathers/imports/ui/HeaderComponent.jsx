import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
export default class HeaderComponent extends Component {

    render() {
      return (
        <div>
          <img src = {Meteor.users.miniavatar} ></img>
          Sveikas atvykęs, {Meteor.users.username}
        </div>
      );
    }
}