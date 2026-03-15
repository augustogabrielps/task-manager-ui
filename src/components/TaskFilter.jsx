import { useState } from "react";

function TaskFilter({ onFilterChange }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({
      q: query,
      status: status,
      priority: priority,
    });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by name or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      >
        <option value="">All status</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      >
        <option value="">All priority</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <button onClick={handleApplyFilters} style={{ padding: "8px 12px" }}>
        Apply
      </button>
    </div>
  );
}

export default TaskFilter;