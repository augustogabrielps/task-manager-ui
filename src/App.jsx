import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

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
    <div className="container">
      <h1>Task Manager</h1>

      <div className="card">
        <h3>Create Task</h3>
        <TaskForm onTaskCreated={loadTasks} />
      </div>

      <div className="card">
        <h3>Filters</h3>
        <TaskFilter onFilterChange={handleFilterChange} />
      </div>

      <TaskList
        tasks={tasks}
        onTaskDeleted={loadTasks}
        onTaskUpdated={loadTasks}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
        </span>

        <button onClick={handleNextPage} disabled={page >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;