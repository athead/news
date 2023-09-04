import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScrollRestoreSchema } from '../types/ScrollRestoreSchema';

const initialState: ScrollRestoreSchema = {
    scroll: {},
};

export const scrollRestoreSlice = createSlice({
    name: 'scrollRestore',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.error = action.payload;
    //             state.isLoading = false;
    //         });
    // },
});

export const { actions: scrollRestoreActions } = scrollRestoreSlice;
export const { reducer: scrollRestoreReducer } = scrollRestoreSlice;
