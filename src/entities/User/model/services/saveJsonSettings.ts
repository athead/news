import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
    'user/saveJsonSettings',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;
        const userData = getUserAuthData(getState());
        const currentSettings = getJsonSettings(getState());
        if (!userData) {
            return rejectWithValue('No user data in settings thunk');
        }
        try {
            const response = await dispatch(
                setJsonSettingsMutation({
                    userId: userData.id,
                    jsonSettings: {
                        ...currentSettings,
                        ...newJsonSettings,
                    },
                }),
            ).unwrap();

            if (!response.jsonSettings) {
                return rejectWithValue('Empty response in user settings thunk');
            }

            return response.jsonSettings;
        } catch (err) {
            return rejectWithValue(`Error: ${err}`);
            // return rejectWithValue(i18n.t('getarticle_error_cr'));
        }
    },
);
