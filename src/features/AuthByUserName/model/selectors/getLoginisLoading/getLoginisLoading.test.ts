import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginisLoading } from './getLoginisLoading';

describe('getLoginisLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginisLoading(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginisLoading(state as StateSchema)).toEqual(false);
    });
});
