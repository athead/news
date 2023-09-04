import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { addCommentFormReducer } from 'features/addCommentForm/model/slices/addCommentFormSlice';
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => {
    return (Story: StoryFn) => {
        return (
            <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
                <Story />
            </StoreProvider>
        );
    };
};
