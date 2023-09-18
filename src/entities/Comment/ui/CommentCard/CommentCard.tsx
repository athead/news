import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

// const reducers: ReducersList = {
//     articleDetails: articleDetailsReducer,
// };

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;
    // const dispatch = useAppDispatch();

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [className, cls.loading])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} borderRadius="50%" />
                    <Skeleton className={cls.username} height={16} width={100} borderRadius="10px" />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} borderRadius="10px" />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }
    return (
        <Card padding="16" border="middle" max>
            <VStack
                data-testid="CommentCard.Content"
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [className])}
            >
                <HStack gap="8">
                    {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
                    <AppLink to={getRouteProfile(comment.user.id)} className={cls.username}>
                        <Text title={comment.user.username} weight="bold" />
                    </AppLink>
                </HStack>
                <Text text={comment.text} />
            </VStack>
        </Card>
    );
});
