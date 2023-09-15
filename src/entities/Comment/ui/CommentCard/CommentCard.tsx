import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

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

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => {
            return SkeletonRedesigned;
        },
        off: () => {
            return SkeletonDeprecated;
        },
    });

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card padding="24" border="middle" max>
                    <VStack
                        data-testid="CommentCard.Content"
                        gap="8"
                        max
                        className={classNames(cls.CommentCardRedesigned, {}, [className])}
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
            }
            off={
                <VStack
                    data-testid="CommentCard.Content"
                    gap="8"
                    max
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <div className={cls.header}>
                        {comment.user.avatar && <AvatarDeprecated size={30} src={comment.user.avatar} />}
                        <AppLinkDeprecated to={getRouteProfile(comment.user.id)} className={cls.username}>
                            {comment.user.username}
                        </AppLinkDeprecated>
                    </div>
                    <TextDeprecated className={cls.text} text={comment.text} />
                </VStack>
            }
        />
    );
});
