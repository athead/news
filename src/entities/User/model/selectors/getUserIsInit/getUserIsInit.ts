import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserIsInit = (state: StateSchema) => {
    return state.user._isInit;
};
