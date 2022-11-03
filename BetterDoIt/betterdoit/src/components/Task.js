import { useState } from "react";
import Storage from "./storage/LocalStorage";
import Task from "./storage/TaskCreator";
import "./Task.scss";

const TaskList = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState(false);
  const [sorted, setSorted] = useState(false);

  const showTaskForm = () => {
    setShowForm(!showForm);
  };

  const changeEditStatus = () => {
    setShowForm(!showForm);
    setEdit(!isEdit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let title = event.target.Title.value;
    let date = event.target.DueDate.value;
    let priority = event.target.Priority.value;
    let notes = event.target.Notes.value;
    let createTask = new Task(title, date, priority, notes);

    if (isEdit) {
      Storage.editTask(props.currentProject, currentTask, createTask);
      changeEditStatus();
      let index = props.taskList.findIndex((key) => key === currentTask);
      let taskList = [...props.taskList];

      taskList.splice(index, 1, createTask);
      props.setTaskList(taskList);
    } else {
      Storage.addTask(props.currentProject, createTask);
      props.setTaskList((prev) => [...prev, createTask]);
    }

    showTaskForm();
  };

  const removeTask = (task) => {
    props.setTaskList((prev) => prev.filter((key) => key.title !== task.title));
    Storage.removeTask(props.currentProject, task);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    changeEditStatus();
  };

  //Work on After
  const sortTask = (sortBy) => {
    // let tasks = [...props.taskList];
    // if (sorted === true) {
    //   tasks.reverse();
    // }
    // if (sortBy === "Task") {
    //   tasks.sort((a, b) =>
    //     a.title > b.title ? 1 : a.title < b.title ? -1 : 0
    //   );
    // } else if (sortBy === "Date") {
    //   tasks.sort((a, b) =>
    //     a.dueDate > b.dueDate ? 1 : a.dueDate < b.dueDate ? -1 : 0
    //   );
    // } else {
    //   tasks.sort((a, b) =>
    //     a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0
    //   );
    // }
    // props.setTaskList(tasks);
    // sortTask(props.currentProject, tasks);
    // setSorted(true);
  };

  return (
    <div className="task_container">
      <div className="task_header">
        <div className="task_header_task" onClick={() => sortTask("Task")}>
          Task
        </div>
        <div className="task_header_date" onClick={() => sortTask("Date")}>
          Due Date
        </div>
        <div
          className="task_header_priority"
          onClick={() => sortTask("Priority")}
        >
          Priority
        </div>
      </div>
      <div className="task_list">
        {props.taskList.map((task) => {
          return (
            <div className="task" onDoubleClick={() => handleEdit(task)}>
              <div className="task_outer">
                <input type="checkbox" className="checkBox" />
                <div className="task_display">
                  <div className="task_title">{task.title}</div>
                  <div className="task_date">{task.dueDate}</div>
                  <div className="task_priority">{task.priority}</div>
                </div>

                <button
                  className="task_remove_button"
                  onClick={() => removeTask(task)}
                >
                  x
                </button>
              </div>
              <div className="task_note">{task.notes}</div>
            </div>
          );
        })}
      </div>
      {props.currentProject && (
        <button onClick={() => showTaskForm()} className="button_create_task">
          Create Task
        </button>
      )}
      {showForm && (
        <div className="task_form">
          <div className="form_container">
            <h2>Add a task</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="Title">Task</label>
              <input
                type="text"
                name="Title"
                id="Title"
                className="form_title"
              />
              <div>
                <label htmlFor="DueDate">Due Date</label>
                <input type="date" name="DueDate" />
                <label htmlFor="Priority">Priority</label>
                <select name="Priority">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <input type="text" name="Notes" placeholder="Additional Notes" />
              <div className="button_container">
                <input type="submit" value="Submit" id="submit" />
                <input type="reset" name="reset" id="reset" />
                <input
                  type="button"
                  value="Cancel"
                  id="cancel"
                  formNoValidate
                  onClick={() => showTaskForm()}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
