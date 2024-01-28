import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-manager-b3k8.onrender.com/api/v1",
  }),
  endpoints: (builder) => ({}),
});
