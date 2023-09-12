import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}
const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => {
        return {
            setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
                query: ({ userId, jsonSettings }) => {
                    return {
                        url: `/users/${userId}`,
                        method: 'PATCH',
                        body: {
                            jsonSettings,
                        },
                    };
                },
            }),
            getUserDataById: build.query<User, string>({
                query: (userId) => {
                    return {
                        url: `/users/${userId}`,
                        method: 'GET',
                    };
                },
            }),
        };
    },
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
