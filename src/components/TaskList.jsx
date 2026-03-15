import { deleteTask, updateTask } from "../services/taskService";

function TaskList({ tasks, onTaskDeleted, onTaskUpdated }) {
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      onTaskDeleted();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      await updateTask(task.id, {
        status: newStatus,
      });

      onTaskUpdated();
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const handlePriorityChange = async (task, newPriority) => {
    try {
      await updateTask(task.id, {
        priority: newPriority,
      });

      onTaskUpdated();
    } catch (error) {
      console.error("Error updating task priority", error);
    }
  };

  const getStatusClass = (status) => {
    if (status === "TODO") return "badge status-todo";
    if (status === "IN_PROGRESS") return "badge status-progress";
    if (status === "DONE") return "badge status-done";
    return "badge";
  };

  const getPriorityClass = (priority) => {
    if (priority === "LOW") return "badge priority-low";
    if (priority === "MEDIUM") return "badge priority-medium";
    if (priority === "HIGH") return "badge priority-high";
    return "badge";
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="card">
          <h3>{task.name}</h3>

          <p>{task.description || "No description"}</p>

          <div style={{ marginBottom: "10px" }}>
            Status:
            <span className={getStatusClass(task.status)}>
              {task.status}
            </span>

            {" "}Priority:
            <span className={getPriorityClass(task.priority)}>
              {task.priority}
            </span>
          </div>

          <p>
            Due date: <strong>{task.dueDate || "Not defined"}</strong>
          </p>

          <div className="form-row">
            <label>
              Status:{" "}
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task, e.target.value)}
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Priority:{" "}
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(task, e.target.value)}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </label>
          </div>

          <button onClick={() => handleDelete(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;