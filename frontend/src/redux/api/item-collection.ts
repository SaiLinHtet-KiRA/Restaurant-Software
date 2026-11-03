import type ItemCollection from "@/interface/ItemCollection";
import type Response from "@/interface/Response";
import { apiSlice } from "./apiSlice";

export const itemCollectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItemCollections: builder.query<Response<ItemCollection[]>, void>({
      query: () => `/item-collection`,
      providesTags: ["ItemCollection"],
    }),
    deleteItemCollection: builder.mutation<Response<ItemCollection>, string>({
      query: (id) => ({ url: `/item-collection/${id}`, method: "DELETE" }),
      invalidatesTags: ["ItemCollection"],
    }),
    createItemCollection: builder.mutation<
      Response<ItemCollection>,
      Partial<ItemCollection>
    >({
      query: (body) => ({ url: "/item-collection", method: "POST", body }),
      invalidatesTags: ["ItemCollection"],
    }),
    updateItemCollection: builder.mutation<
      Response<ItemCollection>,
      Partial<ItemCollection>
    >({
      query: (body) => ({
        url: `/item-collection/${body._id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ItemCollection"],
    }),
  }),
});

export const {
  useGetItemCollectionsQuery,
  useDeleteItemCollectionMutation,
  useCreateItemCollectionMutation,
  useUpdateItemCollectionMutation,
} = itemCollectionApiSlice;
