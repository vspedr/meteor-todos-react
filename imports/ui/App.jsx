import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';

const deleteTask = ({ _id }) => TasksCollection.remove(_id);
const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm/>

      <ul>
        { tasks.map(task => <Task
          key={ task._id }
          task={ task }
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />) }
      </ul>
    </div>
  );
};