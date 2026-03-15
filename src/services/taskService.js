import api from "./api";

export const getTasks = (params = {}) => {
  return api.get("/tasks", { params });
};

export const createTask = (task) => {
  return api.post("/tasks", task);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export const updateTask = (id, updatedTask) => {
  return api.put(`/tasks/${id}`, updatedTask);
};