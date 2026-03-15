import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      name,
      description,
      priority: priority || null,
      dueDate: dueDate || null,
    };

    try {
      await createTask(newTask);

      setName("");
      setDescription("");
      setPriority("");
      setDueDate("");

      onTaskCreated();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      >
        <option value="">Default priority</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <button type="submit" style={{ padding: "8px 12px" }}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;