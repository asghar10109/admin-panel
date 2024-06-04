import { apiUrls } from '../../utils/app-constants'
import { apiSlice } from '../services/apiSlice'

export const contentApi = apiSlice
    .injectEndpoints({
        endpoints: builder => ({
            getAllFaqs: builder.query({
                query: (params) => ({
                    url: `${apiUrls.faq}`,
                    method: "GET",
                    params: params,
                }),
                providesTags: ['faqs'],
            }),

            createFaqs: builder.mutation({
                query(body) {
                    return {
                        url: `${apiUrls.faq}`,
                        method: 'POST',
                        body,
                    }
                },
            }),
            updateFaqs: builder.mutation({
                query(body) {
                    return {
                        url: `${apiUrls.faq}/${body?.id}`,
                        method: 'POST',
                        body: body?.data,
                    }
                },
            }),
            deleteFaq: builder.mutation({
                query: (id) => ({
                    url: `${apiUrls.faq}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ['user'],
            }),
        })
    })

export const {
    useGetAllFaqsQuery,
    useCreateFaqsMutation,
    useUpdateFaqsMutation,
    useDeleteFaqMutation
} = contentApi
