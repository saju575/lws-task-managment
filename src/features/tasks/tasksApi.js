import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => {
        return `/tasks`;
      },
      keepUnusedDataFor: 600,
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const updatedTask = await queryFulfilled;
          if (updatedTask?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                const draftTask = draft.find((c) => c.id == arg.id);
                Object.assign(draftTask, updatedTask.data);
              })
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getTask",
                arg.id.toString(),
                (draft) => {
                  Object.assign(draft, updatedTask.data);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const task = await queryFulfilled;
          //console.log(task.data);

          if (task?.data) {
            // update task cache pessimistically start

            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                draft.push(task.data);
              })
            );
            // update task cache pessimistically end
          }
        } catch (e) {}
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const deleteDispatchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const indx = draft.findIndex((v) => v.id == arg);
            draft.splice(indx, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (e) {
          deleteDispatchResult.undo();
        }
      },
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
