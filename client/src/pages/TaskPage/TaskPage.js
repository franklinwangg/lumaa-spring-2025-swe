import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../../components/TaskItem';

const TaskPage = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));

    if (userData) {
      setUsername(userData.user.username);
    }
  }, []);

  useEffect(() => {
    if (username) {

      const fetchTasks = async () => {
        try {
          const response = await fetch(`http://localhost:3001/tasks/?user_id=${username}`);
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
          const data = await response.json();

          setTasks(data);
        } catch (err) {
          console.error("Error fetching tasks:", err);
        }
      };

      fetchTasks();
    }
  }, [username]);


  // Handle creating a new task
  const handleCreateTask = async () => {
    if (!task.trim()) return; // Prevent creating task if input is empty

    const newTask = { user_id: username, task: task };  // You can add more fields like due date, etc.

    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const createdTask = await response.json();

        setTasks([...tasks, createdTask]); // Add the new task to the tasks list
        setTask(""); // Clear the input field after creating the task
      } else {
        console.error("Error creating task");
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };


  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:3001/tasks/?task_id=${taskId}`, { // taskid undefined
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          // whenever the task is deleted, re-fetch from the database
          const fetchTasks = async () => {
            try {
              const response = await fetch(`http://localhost:3001/tasks/?user_id=${username}`);
              if (!response.ok) {
                throw new Error("Failed to fetch tasks");
              }
              const data = await response.json();

              setTasks(data);
            } catch (err) {
              console.error("Error fetching tasks:", err);
            }
          };

          fetchTasks();
        }
      })
  };

  // Handle updating a task (marking as completed)
  const handleUpdateTask = (task_id, updated_task) => {

    fetch(`http://localhost:3001/tasks/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: task_id, new_task: updated_task }), // task_id is just task itself. let's pass in the TaskItem component
    })
      .then((response) => {

        if (response.ok) {
          // whenever the task is deleted, re-fetch from the database
          const fetchTasks = async () => {
            try {
              const response = await fetch(`http://localhost:3001/tasks/?user_id=${username}`);
              if (!response.ok) {
                throw new Error("Failed to fetch tasks");
              }
              const data = await response.json();

              setTasks(data);
            } catch (err) {
              console.error("Error fetching tasks:", err);
            }
          };

          fetchTasks();
        }
      })
  };


  const handleLogoutButton = () => {
    localStorage.removeItem("token"); // Remove auth token
    navigate("/login"); // Redirect to login page
  };





  return (
    <div>
      <h1>Task Manager</h1>

      {username ? (
        <h2>Welcome, {JSON.stringify(username)}!</h2>
      ) : (
        <h2>Please log in to view your tasks.</h2>
      )}

<button onClick={handleLogoutButton}>
        Logout
      </button>


      <h2>Create a Task</h2>

      <input
        type="text"
        value={task}
        onChange={handleTaskChange}
        placeholder="Enter task name"
      />


      <button onClick={handleCreateTask}>Create Task</button>
      {/* 
      <ul>
        {tasks.map((task, index) => (
          <Task></Task>
          // <li key={index}>{task.task}</li>
        ))}
      </ul> */}

      <div>
        <h2>Task List</h2>
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask} // how to do this?
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
