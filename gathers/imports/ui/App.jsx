import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// App component - represents the whole app
class App extends Component {

    constructor() {
        super();
        this.state = {
          hideCompleted: false,
        };
    }
    componentDidUpdate(){
      if(Meteor.userId()){
        var steamAPI = ' http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=BC48645A4E6E32C76BB4012F958EF147&steamids=76561197960435530';
        if(Meteor.userId()){
          Meteor.http.get(steamAPI, function (err, res) {
            console.log(res.statusCode, res.data);
          });
        }
      }
    }
    handleSubmit(event) {
      event.preventDefault();
  
      // Find the text field via the React ref
      const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
  
      Tasks.insert({
        text,
        createdAt: new Date(), // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username,  // username of logged in user
      });
  
      // Clear form
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
    
    toggleHideCompleted() {
        this.setState({
          hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
          filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
          <Task key={task._id} task={task} />
        ));
    }
  
    render() {
      return (
        <div className="container">
          <header>
            <h1>Todo List ({this.props.incompleteCount})</h1>
            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide Completed Tasks
            </label>

            <AccountsUIWrapper />

            { this.props.currentUser ?
              <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new tasks"
                />
              </form> : ''
            }
          </header>
  
          <ul>
            {this.renderTasks()}
          </ul>
        </div>
      );
    }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};
 
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);