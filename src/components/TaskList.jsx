import { useState } from "react";
import { deleteTask, updateTask } from "../services/taskService";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Box,
  Chip,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function TaskList({
  tasks,
  onTaskDeleted,
  onTaskUpdated,
  onTaskDeleteError,
  onTaskUpdateError,
}) {
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpenDeleteDialog = (task) => {
    setTaskToDelete(task);
  };

  const handleCloseDeleteDialog = () => {
    if (!deleteLoading) {
      setTaskToDelete(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    setDeleteLoading(true);

    try {
      await deleteTask(taskToDelete.id);
      onTaskDeleted();
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task", error);

      if (onTaskDeleteError) {
        onTaskDeleteError();
      }
    } finally {
      setDeleteLoading(false);
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

      if (onTaskUpdateError) {
        onTaskUpdateError();
      }
    }
  };

  const handlePriorityChange = async (task, newPriority) => {
    try {
      await updateTask(task.id, {
        priority: newPriority || null,
      });

      onTaskUpdated();
    } catch (error) {
      console.error("Error updating task priority", error);

      if (onTaskUpdateError) {
        onTaskUpdateError();
      }
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
    <>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <Card key={task.id} elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {task.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {task.description || "No description provided."}
                    </Typography>
                  </Box>

                  <Tooltip title="Delete task">
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteDialog(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    variant="outlined"
                  />

                  <Chip
                    label={task.priority || "NO PRIORITY"}
                    color={getPriorityColor(task.priority)}
                    variant="outlined"
                  />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarTodayIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {task.dueDate || "No due date"}
                  </Typography>
                </Stack>

                <Divider />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="TODO">TODO</MenuItem>
                    <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                    <MenuItem value="DONE">DONE</MenuItem>
                  </Select>

                  <Select
                    value={task.priority || ""}
                    onChange={(e) => handlePriorityChange(task, e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="">NO PRIORITY</MenuItem>
                    <MenuItem value="LOW">LOW</MenuItem>
                    <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                    <MenuItem value="HIGH">HIGH</MenuItem>
                  </Select>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={Boolean(taskToDelete)} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete task?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {taskToDelete
              ? `Are you sure you want to delete "${taskToDelete.name}"? This action cannot be undone.`
              : ""}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={deleteLoading}>
            Cancel
          </Button>

          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskList;