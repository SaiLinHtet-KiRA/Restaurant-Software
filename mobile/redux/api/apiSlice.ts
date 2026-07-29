import { BACKEND_URL } from "@/config";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Table", "Item", "Order", "ItemCollection"],
  endpoints: () => ({}),
});
