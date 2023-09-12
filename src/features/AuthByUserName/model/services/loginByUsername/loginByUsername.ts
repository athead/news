import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User, userActions } from '@/entities/User';
import i18n from '@/shared/config/i18n/i18n';
// import i18n from 'i18next';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// enum LoginErrors {
//     INCORRECT_DATA = '',
//     SERVER_ERROR = '',
// }

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (err) {
            // console.log(err);
            return rejectWithValue(i18n.t('auth_error_cr'));
        }
    },
);
