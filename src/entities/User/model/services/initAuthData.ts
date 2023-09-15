import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!userId) {
            return rejectWithValue('No user data in init auth thunk');
        }
        try {
            const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

            localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, response.features?.isAppRedesigned ? 'new' : 'old');
            return response;
        } catch (err) {
            return rejectWithValue(`Error: ${err}`);
            // return rejectWithValue(i18n.t('getarticle_error_cr'));
        }
    },
);
