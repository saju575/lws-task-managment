import { apiSlice } from "../api/apiSlice";
import { addProject } from "./projectsSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsName: builder.query({
      query: () => `/projectsName`,
      keepUnusedDataFor: 600,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const queryed = await queryFulfilled;
          if (queryed?.data) {
            const newData = queryed.data.payload.map((data) => {
              return {
                focus: data.projectName,
                isAdded: true,
                colorClass: data.colorClass,
              };
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
