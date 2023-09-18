import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleEditor } from '@/features/articleEditor';
import { Page } from '@/widgets/Page';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';
import { articleEditorReducer } from '@/features/articleEditor/model/slices/articleEditorSlice';

interface ArticleEditPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsEditor: articleEditorReducer,
};

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <StickyContentLayout
                content={
                    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
                        <VStack gap="16" max>
                            <ArticleEditor className={className} isEdit={isEdit} articleId={id} />
                        </VStack>
                    </Page>
                }
                // right={<AdditionalInfoContainer />}
            />
        </DynamicModuleLoader>
    );
});

export default ArticleEditPage;
