import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import ChatWrapper from './ChatWrapper.jsx'; 
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// App component - represents the whole app
class App extends Component {

    componentDidUpdate(){
      if (Meteor.isClient) {
            Meteor.call("checkSteam", Meteor.user().profile.id,  function(error, results) {
                console.log(results.content); //results.data should be a JSON object
          });
      }
    }
    componentDidMount(){
      console.log(this.props.currentUser);
    }
    render() {
      return (
        <div className="container">
          <header>

          <AccountsUIWrapper />

          </header>

          <ChatWrapper tasks={this.props.tasks} commentCount={this.props.commentCount} currentUser={this.props.currentUser} />
        </div>
      );
    }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  commentCount: PropTypes.number.isRequired,
};
 
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    commentCount: Tasks.find().count(),
    currentUser: Meteor.user(),
  };
}, App);