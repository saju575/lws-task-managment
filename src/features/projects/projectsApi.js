import { apiSlice } from "../api/apiSlice";
import { addProject } from "./projectsSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsName: builder.query({
      query: () => `/projects`,
      keepUnusedDataFor: 600,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const queryed = await queryFulfilled;
          if (queryed?.data) {
            const newData = queryed.data.map((data) => {
              return { focus: data.projectName, isAdded: true };
            });
            //console.log(newData);
            dispatch(addProject(newData));
          }
        } catch (e) {}
      },
    }),
  }),
});

export const { useGetProjectsNameQuery } = projectsApi;
