import type Response from "@/interface/Response";
import type Table from "@/interface/Table";
import { apiSlice } from "./apiSlice";

export type TablePaginationQuery = {
  page?: number;
  limit?: number;
  taken?: boolean;
};

export const tableApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<Response<Table[]>, TablePaginationQuery>({
      query: ({ taken }) => `/table?taken=${taken}`,
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
