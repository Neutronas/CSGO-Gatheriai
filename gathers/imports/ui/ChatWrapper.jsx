import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';
export default class ChatWrapper extends Component {

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

    renderTasks() {
        let commentTasks = this.props.tasks;
        return commentTasks.map((task) => (
          <Task key={task._id} task={task} />
        ));
    }
    render() {
        return (
            <div>
                <h1>Chat ({this.props.commentCount})</h1>
            <ul>
                {this.renderTasks()}
            </ul>
            { this.props.currentUser ?
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new tasks"
                    />
                </form> : ''
            }
            </div>
        );
    }
}
ChatWrapper.propTypes = {
  tasks: PropTypes.array.isRequired,
  commentCount: PropTypes.number.isRequired,
};