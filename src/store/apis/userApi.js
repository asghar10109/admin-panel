
import { apiUrls } from '../../utils/app-constants'
import { apiSlice } from '../services/apiSlice'

export const userApi = apiSlice
    .enhanceEndpoints({
        tagTypes: ['user'],
    })
    .injectEndpoints({
        endpoints: builder => ({
            getAllUsers: builder.query({
                query: (params) => ({
                    url: `${apiUrls.getAllUsers}`,
                    method: "GET",
                    params: params,
                }),
                providesTags: ['user'],
            }),
            blockUnblockUser: builder.mutation({
                query: (id) => ({
                    url: `${apiUrls.blockUnblockUser}/${id}`,
                    method: "GET",
                }),
                invalidatesTags: ['user'],
            }),
            deleteUser: builder.mutation({
                query: (id) => ({
                    url: `${apiUrls.deleteUser}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ['user'],
            }),
            dashboardData: builder.query({
                query: () => ({
                    url: `${apiUrls.dashboardData}`,
                    method: "GET",
                })
            })
        })
    })

export const {
    useGetAllUsersQuery,
    useBlockUnblockUserMutation,
    useDeleteUserMutation,
    useDashboardDataQuery
} = userApi
