import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      name,
      description
    };

    try {
      await createTask(newTask);

      setName("");
      setDescription("");

      onTaskCreated();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;