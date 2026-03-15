import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

function TaskFilter({ onFilterChange }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({
      q: query,
      status,
      priority,
    });
  };

  const handleClearFilters = () => {
    setQuery("");
    setStatus("");
    setPriority("");

    onFilterChange({
      q: "",
      status: "",
      priority: "",
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filters
      </Typography>

      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Search"
            placeholder="Search by name or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All status</MenuItem>
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </TextField>

          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="">All priority</MenuItem>
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </TextField>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleClearFilters}>
            Clear
          </Button>

          <Button variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default TaskFilter;