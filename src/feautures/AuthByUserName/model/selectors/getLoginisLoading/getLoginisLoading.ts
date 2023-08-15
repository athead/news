import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginisLoading = (state: StateSchema) => {
    return state?.loginForm?.isLoading || false;
};
