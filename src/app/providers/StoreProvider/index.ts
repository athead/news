import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type {
    StateSchema, ReduxStoreWithManager, ThunkConfig, StateSchemaKey,
} from './config/StateSchema';

export { StoreProvider, createReduxStore };

export type {
    StateSchema, ReduxStoreWithManager, AppDispatch, ThunkConfig, StateSchemaKey,
};
