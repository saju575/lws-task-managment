import { apiSlice } from "../api/apiSlice";

export const membersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembersName: builder.query({
      query: () => `/teamMember`,
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetMembersNameQuery } = membersApi;
