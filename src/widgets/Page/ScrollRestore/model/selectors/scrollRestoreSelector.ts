import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getRestoreScrollSize = (state: StateSchema) => {
    return state.scrollRestore.scroll;
};
export const getRestoreScrollByPath = createSelector(
    getRestoreScrollSize,
    (state: StateSchema, path: string) => {
        return path;
    },
    (scroll, path) => {
        return scroll[path] || 0;
    },
);
