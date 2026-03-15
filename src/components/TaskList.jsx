import { deleteTask, updateTask } from "../services/taskService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";

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

  const getStatusColor = (status) => {
    if (status === "TODO") return "default";
    if (status === "IN_PROGRESS") return "primary";
    if (status === "DONE") return "success";
    return "default";
  };

  const getPriorityColor = (priority) => {
    if (priority === "LOW") return "success";
    if (priority === "MEDIUM") return "warning";
    if (priority === "HIGH") return "error";
    return "default";
  };

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.name}</Typography>

            <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
              {task.description || "No description"}
            </Typography>

            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Due date: {task.dueDate || "Not defined"}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
              <Chip
                label={task.status}
                color={getStatusColor(task.status)}
                variant="outlined"
              />

              <Chip
                label={task.priority}
                color={getPriorityColor(task.priority)}
                variant="outlined"
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <Select
                size="small"
                value={task.status}
                onChange={(e) => handleStatusChange(task, e.target.value)}
              >
                <MenuItem value="TODO">TODO</MenuItem>
                <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                <MenuItem value="DONE">DONE</MenuItem>
              </Select>

              <Select
                size="small"
                value={task.priority}
                onChange={(e) => handlePriorityChange(task, e.target.value)}
              >
                <MenuItem value="LOW">LOW</MenuItem>
                <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                <MenuItem value="HIGH">HIGH</MenuItem>
              </Select>
            </Box>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TaskList;