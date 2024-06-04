import { apiUrls } from '../../utils/app-constants'
import { apiSlice } from '../services/apiSlice'

export const ReportApi = apiSlice
    .injectEndpoints({
        endpoints: builder => ({
            getAllReportTypes: builder.query({
                query: (params) => ({
                    url: `${apiUrls.reportTypes}`,
                    method: "GET",
                    params: params,
                }),
                providesTags: ['report'],
            }),

            createReports: builder.mutation({
                query(body) {
                    return {
                        url: `${apiUrls.reportTypes}`,
                        method: 'POST',
                        body,
                    }
                },
                invalidatesTags: ['user'],
            }),
            updateReports: builder.mutation({
                query(body) {
                    return {
                        url: `${apiUrls.reportTypes}/${body.id}`,
                        method: 'POST',
                        body: body?.data,
                    }
                },
                invalidatesTags: ['user'],
            }),
            deleteReports: builder.mutation({
                query: (id) => ({
                    url: `${apiUrls.reportTypes}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ['report'],
            }),
        })
    })

export const {
    useGetAllReportTypesQuery,
    useCreateReportsMutation,
    useUpdateReportsMutation,
    useDeleteReportsMutation
} = ReportApi
