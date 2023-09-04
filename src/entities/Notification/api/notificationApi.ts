import { rtkApi } from 'shared/api/rtkApi';
import { NotificationSchema } from '../model/types/NotificationSchema';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getNotifications: build.query<NotificationSchema[], null>({
                query: () => {
                    return {
                        url: '/notifications',
                    };
                },
            }),
        };
    },
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
