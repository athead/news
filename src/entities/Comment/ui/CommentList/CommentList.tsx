import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Text } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

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
        <VStack gap="16" className={classNames(cls.CommentList, {}, [className])}>
            {comments.length !== 0 ? (
                comments.map((comment) => {
                    return <CommentCard key={comment.id} isLoading={isLoading} comment={comment} />;
                })
            ) : (
                <Text text={t('no_comments')} />
            )}
        </VStack>
    );
});
