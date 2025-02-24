import { useState } from "react";
import "./TaskItem.css"; 

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedTask, setUpdatedTask] = useState(task.task);

  const handleInputChange = (e) => {
    setUpdatedTask(e.target.value);
  };



  const handleSubmitUpdateButton = (e) => {
    e.preventDefault();

    onUpdate(task.task_id, updatedTask); 
    setIsEditing(false);
  };

  return (
    <div
      className={`task-item ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`task-text ${task.completed ? "completed" : ""}`}>
        {task.task}
      </span>

      {isHovered && (
        <div className="task-buttons">
          <button
            onClick={() => setIsEditing(true)} // Show popup when clicked
            className="task-button update-button"
          >
            Update
          </button>

          <button
            onClick={
              () => {
                console.log("task : ", task);
                onDelete(task.task_id);
              }}
            className="task-button delete-button"
          >
            Delete
          </button>
        </div>
      )}

      {isEditing && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Task</h3>
            <form onSubmit={handleSubmitUpdateButton}>
              <input
                type="text"
                value={updatedTask}
                onChange={handleInputChange}
                autoFocus
              />
              <button type="submit">Submit</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
