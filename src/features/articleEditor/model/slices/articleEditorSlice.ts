import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleEditorSchema } from '../types/articleEditorSchema';
import { Article, ArticleBlock, ArticleBlockType, ArticleType } from '@/entities/Article';
import { fetchEditArticleById } from '../services/fetchEditArticleById/fetchEditArticleById';
import { User } from '@/entities/User';

const initialState: ArticleEditorSchema = {
    isLoading: false,
    isEdited: false,
    error: undefined,
    data: undefined,
    form: undefined,
};

const emptyArticle: Article = {
    id: '1',
    // TODO
    createdAt: '20.09.2023',
    blocks: [],
    img: '',
    subtitle: '',
    title: '',
    type: [ArticleType.ALL],
    user: { id: '1', username: '1' },
    views: 0,
};

const emptyTextArticleBlock: ArticleBlock = {
    id: '1',
    text: '',
    type: ArticleBlockType.TEXT,
};

const emptyTitleArticleBlock: ArticleBlock = {
    id: '1',
    title: '',
    type: ArticleBlockType.TITLE,
};

const emptyCodeArticleBlock: ArticleBlock = {
    id: '1',
    code: '',
    type: ArticleBlockType.CODE,
};

const emptyImageArticleBlock: ArticleBlock = {
    id: '1',
    src: '',
    title: '',
    type: ArticleBlockType.IMAGE,
};

const getBlockByType = (type: ArticleBlockType) => {
    switch (type) {
        case ArticleBlockType.TEXT:
            return emptyTextArticleBlock;
        case ArticleBlockType.TITLE:
            return emptyTitleArticleBlock;
        case ArticleBlockType.IMAGE:
            return emptyImageArticleBlock;
        case ArticleBlockType.CODE:
            return emptyCodeArticleBlock;
        default:
            return emptyTextArticleBlock;
    }
};
const getArticleBlockId = (form?: DeepPartial<Article>) => {
    if (!form) return '1';
    if (!form.blocks?.length) return '1';
    return String(form.blocks.length + 1);
};

export const articleEditorSlice = createSlice({
    name: 'articleEditor',
    initialState,
    reducers: {
        updateArticle: (state, action: PayloadAction<Partial<Article>>) => {
            state.form = { ...state.form, ...action.payload };
            if (JSON.stringify(state.form) === JSON.stringify(state.data)) {
                state.isEdited = false;
            } else {
                state.isEdited = true;
            }
        },
        initNewArticle: (state, action: PayloadAction<User>) => {
            state.form = { ...emptyArticle, user: action.payload };
        },
        addArticleBlock: (state, action: PayloadAction<ArticleBlockType>) => {
            if (!state.form) state.form = { ...emptyArticle };
            if (!state.form.blocks?.length) state.form.blocks = [getBlockByType(action.payload)];
            else {
                state.form.blocks = [
                    ...state.form.blocks,
                    { ...getBlockByType(action.payload), id: getArticleBlockId(state.form) },
                ];
            }
        },
        removeArticleBlock: (state, action: PayloadAction<string>) => {
            state.form!.blocks?.filter((block) => {
                return block?.id !== action.payload;
            });
        },
        cancelEdit: (state) => {
            state.form = state.data;
            state.isEdited = false;
            state.validateErrors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEditArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEditArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchEditArticleById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchArticleData.pending, (state) => {
    //             state.validateErrors = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //             state.form = action.payload;
    //         })
    //         .addCase(fetchArticleData.rejected, (state, action) => {
    //             state.error = action.payload;
    //             state.isLoading = false;
    //         })
    //         .addCase(updateArticleData.pending, (state) => {
    //             state.validateErrors = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(updateArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //             state.form = action.payload;
    //             state.validateErrors = undefined;
    //             state.readonly = true;
    //         })
    //         .addCase(updateArticleData.rejected, (state, action) => {
    //             state.validateErrors = action.payload;
    //             state.isLoading = false;
    //         });
    // },
});

export const { actions: articleEditorActions } = articleEditorSlice;
export const { reducer: articleEditorReducer } = articleEditorSlice;
