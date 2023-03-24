import { apiSlice } from "../api/apiSlice";

export const membersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembersName: builder.query({
      query: () => `/team`,
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetMembersNameQuery } = membersApi;
