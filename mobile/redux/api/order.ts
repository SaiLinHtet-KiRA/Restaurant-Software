import Order from "@/interface/Order";
import Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Response<Order[]>, void>({
      query: () => `/orders`,
      providesTags: ["Order"],
    }),
    // deleteOrder: builder.mutation<Response<Order>, string>({
    //   query: (id) => ({ url: `/order/${id}`, method: "DELETE" }),
    //   invalidatesTags: ["Order"],
    // }),
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
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderApiSlice;
