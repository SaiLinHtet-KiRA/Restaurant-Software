import Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";
import Item from "@/interface/Item";

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Response<Item[]>, void>({
      query: () => `/items`,
      providesTags: ["ItemCollection"],
    }),
    deleteItem: builder.mutation<Response<Item>, string>({
      query: (id) => ({ url: `/item/${id}`, method: "DELETE" }),
      invalidatesTags: ["ItemCollection"],
    }),
    createItem: builder.mutation<Response<Item>, FormData>({
      query: (body) => ({ url: "/item", method: "POST", body }),
      invalidatesTags: ["ItemCollection"],
    }),
    updateItem: builder.mutation<
      Response<Item>,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({ url: "/item/" + id, method: "PATCH", body }),
      invalidatesTags: ["ItemCollection"],
    }),
  }),
});

export const {
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetItemsQuery,
  useUpdateItemMutation,
} = itemApiSlice;
