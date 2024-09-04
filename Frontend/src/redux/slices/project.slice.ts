// src/features/project/projectSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectInterface, TaskInterface } from "../../interfaces";

export interface projectState {
  project: ProjectInterface | null;
  isChangedAllowed: boolean;
  taskToUpdate: TaskInterface | null;
}

const initialState: projectState = {
  project: null,
  isChangedAllowed: false,
  taskToUpdate: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectInterface>) => {
      state.project = action.payload;
    },
    updateProject: (state, action: PayloadAction<any>) => {
      state.project = { ...state.project, ...action.payload };
    },
    clearProject: (state) => {
      state.project = null;
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; task: any }>
    ) => {
      // Find the index of the task by its ID
      const index = state.project?.tasks.findIndex(
        (task) => task._id === action.payload.taskId
      );

      // Check if the task exists
      if (index !== undefined && index > -1) {
        // Update the task status
        state.project!.tasks[index] = action.payload.task;
      } else {
        // Log an error if the task was not found
        console.error("Task not found in project tasks");
      }
    },
    setIsChangeAllowed: (state, action: PayloadAction<boolean>) => {
      state.isChangedAllowed = action.payload;
    },
    setTaskToUpdate: (state, action: PayloadAction<TaskInterface>) => {
      state.taskToUpdate = action.payload;
    },
    clearTaskToUpdate: (state) => {
      state.taskToUpdate = null;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; taskStatus: any }>
    ) => {
      // Find the index of the task by its ID
      const index = state.project?.tasks.findIndex(
        (task) => task._id === action.payload.taskId
      );

      // Check if the task exists
      if (index !== undefined && index > -1) {
        // Update the task status
        state.project!.tasks[index].taskStatus = action.payload.taskStatus;
      } else {
        // Log an error if the task was not found
        console.error("Task not found in project tasks");
      }
    },

    updateTaskAssignee: (
      state,
      action: PayloadAction<{ taskId: string; assignee: any }>
    ) => {
      // Find the index of the task by its ID
      const index = state.project?.tasks.findIndex(
        (task) => task._id === action.payload.taskId
      );

      // Check if the task exists
      if (index !== undefined && index > -1) {
        // Update the task status
        state.project!.tasks[index].assignee = action.payload.assignee;
      } else {
        // Log an error if the task was not found
        console.error("Task not found in project tasks");
      }
    },
    updateAllTasks: (state, action: PayloadAction<TaskInterface[]>) => {
      state.project!.tasks = action.payload;
    },
  },
});

export const {
  setProject,
  updateProject,
  clearProject,
  updateTask,
  setIsChangeAllowed,
  setTaskToUpdate,
  clearTaskToUpdate,
  updateTaskStatus,
  updateTaskAssignee,
  updateAllTasks,
} = projectSlice.actions;
export default projectSlice.reducer;
