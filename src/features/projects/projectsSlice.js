import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isSuccess: false,
  jobName: "",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.list = action.payload;
      state.isSuccess = true;
    },
    updateProject: (state, action) => {
      const newArray = state.list.map((obj) => {
        if (obj.focus === action.payload.focus) {
          obj.isAdded = action.payload.isAdded;
        }
        return obj;
      });
      state.list = newArray;
    },
    setSearchName: (state, action) => {
      state.jobName = action.payload;
    },
  },
});

export default projectsSlice.reducer;

export const { addProject, updateProject, setSearchName } =
  projectsSlice.actions;
