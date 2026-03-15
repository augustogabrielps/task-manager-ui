import { useState } from "react";
import { createTask } from "../services/taskService";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function TaskForm({ onTaskCreated, onTaskCreateError }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      name,
      description,
      priority: priority || null,
      dueDate: dueDate || null,
    };

    setLoading(true);

    try {
      await createTask(newTask);

      setName("");
      setDescription("");
      setPriority("");
      setDueDate("");

      onTaskCreated();
    } catch (error) {
      console.error("Error creating task", error);

      if (onTaskCreateError) {
        onTaskCreateError();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create a new task
      </Typography>

      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="">Default priority</MenuItem>
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </TextField>

          <TextField
            label="Due date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
          >
            Add Task
          </LoadingButton>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default TaskForm;