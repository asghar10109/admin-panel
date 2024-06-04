import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './services/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import userSlice from './slices/userSlice'
import faqSlice from "./slices/faqSlice.js";
import reportSlice from "./slices/reportSlice.js";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userSlice,
        faqs: faqSlice,
        reports: reportSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
})

setupListeners(store.dispatch)

