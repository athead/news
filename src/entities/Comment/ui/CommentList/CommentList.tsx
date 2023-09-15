import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentListProps {
    className?: string;
    isLoading?: boolean;
    comments: Comment[];
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, isLoading, comments } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }
    return (
        <VStack gap="16" max className={classNames(cls.CommentList, {}, [className])}>
            {comments.length !== 0 ? (
                comments.map((comment) => {
                    return <CommentCard key={comment.id} isLoading={isLoading} comment={comment} />;
                })
            ) : (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text text={t('no_comments')} />}
                    off={<TextDeprecated text={t('no_comments')} />}
                />
            )}
        </VStack>
    );
});
