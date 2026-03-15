import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    getTasks()
      .then((response) => {
        setTasks(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "auto" }}>
      <h1>Task Manager</h1>

      <TaskForm onTaskCreated={loadTasks} />

      <hr />

      <TaskList
        tasks={tasks}
        onTaskDeleted={loadTasks}
        onTaskUpdated={loadTasks}
      />
    </div>
  );
}

export default App;