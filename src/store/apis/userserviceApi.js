
import { apiUrls } from '../../utils/app-constants'
import { apiSlice } from '../services/apiSlice'

export const userApi = apiSlice
    .enhanceEndpoints({
        tagTypes: ['user'],
    })
    .injectEndpoints({
        endpoints: builder => ({
            getUserService: builder.query({
                query: (params) => ({
                    url: `${apiUrls.userService}`,
                    method: "GET",
                    params: params,
                }),
                providesTags: ['user'],
            })
        })
    })

export const {
    useGetUserServiceQuery,
} = userApi
