import History from "@/interface/History";
import Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";

export const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistorys: builder.query<Response<History[]>, void>({
      query: () => `/historys`,
      providesTags: ["History"],
    }),
    updateHistory: builder.mutation<
      Response<History>,
      { id: string; body: History }
    >({
      query: ({ id, body }) => ({
        url: "/history/" + id,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    createHistory: builder.mutation<Response<History>, History>({
      query: (body) => ({ url: "/history", method: "POST", body }),
      invalidatesTags: ["History", "Order"],
    }),
  }),
});

export const {
  useGetHistorysQuery,
  useCreateHistoryMutation,
  useUpdateHistoryMutation,
} = historyApiSlice;
