import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';
export default class ChatWrapper extends Component {
    constructor() {
        super();
        this.state = {
          hideCompleted: false,
        };
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
            <div>
                <h1>Chat ({this.props.incompleteCount})</h1>
                <label className="hide-completed">
                <input
                    type="checkbox"
                    readOnly
                    checked={this.state.hideCompleted}
                    onClick={this.toggleHideCompleted.bind(this)}
                />
                Hide Completed Tasks
                </label>

                { this.props.currentUser ?
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new tasks"
                    />
                </form> : ''
                }
    
            <ul>
                {this.renderTasks()}
            </ul>
            </div>
        );
    }
}
ChatWrapper.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};