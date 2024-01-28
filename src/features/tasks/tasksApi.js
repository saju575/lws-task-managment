import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ projectsName, searchField = "", status, page = 1 }) => {
        const listString = projectsName
          .filter((item) => item.isAdded)
          .map((item) => encodeURIComponent(item.focus))
          .join(",");
        const queryParams = {};
        if (page) queryParams.page = page;
        if (searchField) {
          queryParams.taskName = searchField;
        }
        if (status) {
          queryParams.status = status;
        }

        if (listString) queryParams.projectName = listString;

        const queryString = new URLSearchParams(queryParams).toString();

        return `/task?${queryString}`;
      },
      keepUnusedDataFor: 600,
      providesTags: ["Tasks"],
    }),
    getTask: builder.query({
      query: (id) => `/task/${id}`,
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/task/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
      // onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
      //   try {
      //     const updatedTask = await queryFulfilled;
      //     if (updatedTask?.data) {
      //       dispatch(
      //         apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
      //           const draftTask = draft.find((c) => c.id == arg.id);
      //           Object.assign(draftTask, updatedTask.data);
      //         })
      //       );
      //       dispatch(
      //         apiSlice.util.updateQueryData(
      //           "getTask",
      //           arg.id.toString(),
      //           (draft) => {
      //             Object.assign(draft, updatedTask.data);
      //           }
      //         )
      //       );
      //     }
      //   } catch (err) {}
      // },
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/task/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
      // onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
      //   try {
      //     const task = await queryFulfilled;
      //     //console.log(task.data);

      //     if (task?.data) {
      //       // update task cache pessimistically start

      //       dispatch(
      //         apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
      //           draft.push(task.data);
      //         })
      //       );
      //       // update task cache pessimistically end
      //     }
      //   } catch (e) {}
      // },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
      // onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
      //   const deleteDispatchResult = dispatch(
      //     apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
      //       console.log(draft);
      //       const indx = draft.findIndex((v) => v.id == arg);
      //       // console.log(indx);
      //       draft.splice(indx, 1);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch (e) {
      //     console.log("error", e);
      //     deleteDispatchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateStatusMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
