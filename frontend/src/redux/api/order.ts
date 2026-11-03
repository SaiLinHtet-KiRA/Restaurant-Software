import type Order from "@/interface/Order";
import type Response from "@/interface/Response";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Response<Order[]>, void>({
      query: () => `/orders`,
      providesTags: ["Order"],
    }),
    updateOrder: builder.mutation<Response<Order>, { id: string; body: Order }>(
      {
        query: ({ id, body }) => ({
          url: "/order/" + id,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Order"],
      },
    ),
    createOrder: builder.mutation<Response<Order>, Order>({
      query: (body) => ({ url: "/order", method: "POST", body }),
      invalidatesTags: ["Order", "Table"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderApiSlice;
