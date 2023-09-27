import { useTranslation } from 'react-i18next';
import { MouseEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { OutputData } from '@editorjs/editorjs';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { fetchEditArticleById } from '../../model/services/fetchEditArticleById/fetchEditArticleById';
import { Skeleton } from '@/shared/ui/Skeleton';
import { getArticleEditorIsLoading } from '../../model/selectors/getArticleEditorIsLoading';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { articleEditorActions } from '../../model/slices/articleEditorSlice';
import { getArticleEditorForm } from '../../model/selectors/getArticleEditorForm';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getArticleEditorIsEdited } from '../../model/selectors/getArticleEditorIsEdited';
import { Button } from '@/shared/ui/Button';
import { updateArticleData } from '../../model/services/updateArticleData/updateArticleData';
import { Dropdown } from '@/shared/ui/Popups';
import AddIcon from '@/shared/assets/icons/add.svg';
import { Icon } from '@/shared/ui/Icon';
import { ArticleBlockType } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';
import cls from './ArticleEditor.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
// eslint-disable-next-line
import { ArticleBlockEditor } from '@/features/ArticleBlockEditor';
import { renderArticleBlock } from './renderBlock';

interface ArticleEditorProps {
    className?: string;
    isEdit: boolean;
    articleId?: string;
}

const ArticleDetailsSkeleton = () => {
    return (
        <>
            <Skeleton width={200} height={40} borderRadius="16px" />
            <Skeleton width={400} height={30} borderRadius="12px" />
            <Skeleton width="100%" height={300} borderRadius="24px" />
            <Skeleton width={300} height={30} borderRadius="12px" />
            <Skeleton width={200} height={24} borderRadius="12px" />
            <Skeleton width={400} height={24} borderRadius="12px" />
        </>
    );
};

export const ArticleEditor = memo((props: ArticleEditorProps) => {
    const { className, isEdit, articleId } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const caretteRef = useRef<HTMLDivElement>(null);
    const userData = useSelector(getUserAuthData);
    const isLoading = useSelector(getArticleEditorIsLoading);
    const isArticleEdited = useSelector(getArticleEditorIsEdited);
    // const articleDetals = useSelector(getArticleEditorData);
    const articleForm = useSelector(getArticleEditorForm);
    const [isBlockHovered, setIsBlockHovered] = useState(false);
    const [caretteTop, setCaretteTop] = useState('0');
    const [data, setData] = useState<OutputData>();

    useEffect(() => {
        if (articleId) dispatch(fetchEditArticleById(articleId));
        else if (userData) dispatch(articleEditorActions.initNewArticle(userData));
    }, [dispatch, articleId, userData]);

    const onArticleTitleChange = useCallback(
        (value?: string) => {
            dispatch(articleEditorActions.updateArticle({ title: value || '' }));
        },
        [dispatch],
    );

    const onArticleSubtitleChange = useCallback(
        (value?: string) => {
            dispatch(articleEditorActions.updateArticle({ subtitle: value || '' }));
        },
        [dispatch],
    );

    const onArticleCancelEditing = useCallback(() => {
        dispatch(articleEditorActions.cancelEdit());
    }, [dispatch]);

    const onArticleSaveEditing = useCallback(() => {
        dispatch(updateArticleData());
    }, [dispatch]);

    const onAddBlock = useCallback(
        (blockType: ArticleBlockType) => {
            dispatch(articleEditorActions.addArticleBlock(blockType));
        },
        [dispatch],
    );

    const onMouseLeaveHandler = useCallback(() => {
        setIsBlockHovered(false);
    }, []);

    const onMouseMoveHandler = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            const target = e.target as HTMLElement;
            if (target.getAttribute('data-block')) setCaretteTop(String(target.offsetTop));
            if (!isBlockHovered) setIsBlockHovered(true);
        },
        [isBlockHovered],
    );

    let content;
    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else {
        content = (
            <VStack gap="16">
                <Input
                    size="xl"
                    variant="clear"
                    value={articleForm?.title}
                    onChange={onArticleTitleChange}
                    placeholder={t('title')}
                    data-block="title"
                    onMouseMove={onMouseMoveHandler}
                    onMouseLeave={onMouseLeaveHandler}
                />
                <Input
                    size="l"
                    variant="clear"
                    value={articleForm?.subtitle}
                    onChange={onArticleSubtitleChange}
                    placeholder={t('subtitle')}
                    data-block="subtitle"
                    onMouseMove={onMouseMoveHandler}
                    onMouseLeave={onMouseLeaveHandler}
                />
                {articleForm?.blocks && articleForm.blocks.map(renderArticleBlock)}
                {/* <ArticleBlockEditor data={data} onChange={setData} /> */}
            </VStack>
        );
    }

    const items = [
        {
            content: t('title_block'),
            onClick: () => {
                return onAddBlock(ArticleBlockType.TITLE);
            },
        },
        {
            content: t('text_block'),
            onClick: () => {
                return onAddBlock(ArticleBlockType.TEXT);
            },
        },
        {
            content: t('image_block'),
            onClick: () => {
                return onAddBlock(ArticleBlockType.IMAGE);
            },
        },
        {
            content: t('code_block'),
            onClick: () => {
                return onAddBlock(ArticleBlockType.CODE);
            },
        },
    ];
    return (
        <>
            <Card border="middle" padding="24" max className={className}>
                <HStack justify="between">
                    {isEdit ? <Text title={t('editing_article')} /> : <Text title={t('creating_article')} />}

                    <HStack gap="8">
                        {isArticleEdited && (
                            <Button color="success" onClick={onArticleSaveEditing}>
                                {t('save_btn')}
                            </Button>
                        )}
                        {isArticleEdited && (
                            <Button color="error" onClick={onArticleCancelEditing}>
                                {t('cancel_btn')}
                            </Button>
                        )}
                        <Dropdown
                            direction="bottom left"
                            trigger={<Icon clickable Svg={AddIcon} width={26} height={26} />}
                            items={items}
                        />
                    </HStack>
                </HStack>
            </Card>
            <Card border="middle" padding="24" max className={classNames(cls.mainContent, {}, [className])}>
                {content}
                <div
                    ref={caretteRef}
                    style={{ top: `${caretteTop}px` }}
                    className={classNames(cls.carette, { [cls.visible]: isBlockHovered }, [])}
                >
                    123
                </div>
            </Card>
        </>
    );
});
