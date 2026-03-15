import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { Container, Typography, Box, Divider, Button } from "@mui/material";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const loadTasks = () => {
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
      });
  };

  useEffect(() => {
    loadTasks();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setPage(0);
    setFilters(newFilters);
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
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Task Manager
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <TaskForm onTaskCreated={loadTasks} />
      </Box>

      <Divider sx={{ marginBottom: 3 }} />

      <TaskFilter onFilterChange={handleFilterChange} />

      <Box sx={{ marginTop: 3 }}>
        <TaskList
          tasks={tasks}
          onTaskDeleted={loadTasks}
          onTaskUpdated={loadTasks}
        />
      </Box>

      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Previous
        </Button>

        <Typography>
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
    </Container>
  );
}

export default App;