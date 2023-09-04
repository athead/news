import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { VStack } from 'shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

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
            <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} borderRadius="50%" />
                    <Skeleton className={cls.username} height={16} width={100} borderRadius="10px" />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} borderRadius="10px" />
            </div>
        );
    }

    if (!comment) {
        return null;
    }
    return (
        <VStack gap="8" max className={classNames(cls.CommentCard, {}, [className])}>
            <div className={cls.header}>
                {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
                <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.username}>
                    {comment.user.username}
                </AppLink>
            </div>
            <Text className={cls.text} text={comment.text} />
        </VStack>
    );
});
