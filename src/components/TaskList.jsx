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
      console.error("Error updating task", error);
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
            background: "white",
          }}
        >
          <h3>{task.name}</h3>

          <p>{task.description}</p>

          <p>
            Priority: <strong>{task.priority}</strong>
          </p>

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

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;