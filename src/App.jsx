import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const loadTasks = () => {
    setLoading(true);

    getTasks({
      ...filters,
      page,
      size,
    })
      .then((response) => {
        setTasks(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        showSnackbar("Error fetching tasks", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTasks();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setPage(0);
    setFilters(newFilters);
  };

  const handleTaskCreated = () => {
    loadTasks();
    showSnackbar("Task created successfully", "success");
  };

  const handleTaskDeleted = () => {
    loadTasks();
    showSnackbar("Task deleted successfully", "success");
  };

  const handleTaskUpdated = () => {
    loadTasks();
    showSnackbar("Task updated successfully", "success");
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography variant="h3" sx={{ mb: 1 }}>
              Task Manager
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Organize your tasks, update priorities, and track progress in one place.
            </Typography>
          </Box>

          <TaskForm
            onTaskCreated={handleTaskCreated}
            onTaskCreateError={() => showSnackbar("Error creating task", "error")}
          />

          <TaskFilter onFilterChange={handleFilterChange} />

          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Task List
            </Typography>

            {loading ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <CircularProgress />
              </Box>
            ) : tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onTaskDeleted={handleTaskDeleted}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleteError={() => showSnackbar("Error deleting task", "error")}
                onTaskUpdateError={() => showSnackbar("Error updating task", "error")}
              />
            ) : (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No tasks found
                </Typography>

                <Typography color="text.secondary">
                  Try creating a new task or adjusting your filters.
                </Typography>
              </Box>
            )}
          </Paper>

          <Paper elevation={1} sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={page === 0}
              >
                Previous
              </Button>

              <Typography sx={{ fontWeight: 500 }}>
                Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
              </Typography>

              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={page >= totalPages - 1}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Stack>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;