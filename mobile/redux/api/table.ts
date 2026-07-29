import Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";
import Table from "@/interface/Table";

export type TablePaginationQuery = {
  page?: number;
  limit?: number;
};

export const tableApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<Response<Table[]>, void>({
      query: () => `/table`,
      providesTags: ["Table"],
    }),
    deleteTable: builder.mutation<Response<Table>, string>({
      query: (id) => ({ url: `/table/${id}`, method: "DELETE" }),
      invalidatesTags: ["Table"],
    }),

    createTable: builder.mutation<Response<Table>, void>({
      query: (body) => ({ url: "/table", method: "POST", body }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useDeleteTableMutation,
  useCreateTableMutation,
} = tableApiSlice;
