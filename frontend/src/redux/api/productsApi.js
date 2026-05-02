import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params: {
                    page: params?.page,
                    keyword: params?.keyword || undefined,
                    "price[gte]": params?.min || undefined,
                    "price[lte]": params?.max || undefined,
                },
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => `/product/${id}`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApi;