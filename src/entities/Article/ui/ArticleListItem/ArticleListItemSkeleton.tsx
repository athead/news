import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ArticleView } from '../../model/consts/consts';
import cls from './ArticleListItem.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.BLOCK) {
        const cardContent = (
            <VStack max gap="16">
                <HStack gap="8">
                    <Skeleton className={cls.avatar} width={32} height={32} borderRadius="50%" />
                    <Skeleton width={100} height={20} borderRadius="10px" />
                    <Skeleton width={100} height={20} borderRadius="10px" />
                </HStack>
                <Skeleton width={160} height={30} borderRadius="10px" />
                <Skeleton width={260} height={20} borderRadius="10px" />
                <Skeleton height={300} className={cls.img} borderRadius="24px" />
                <Skeleton width="30%" height={20} borderRadius="10px" />
                <Skeleton width="10%" height={20} borderRadius="10px" />
                <Skeleton width="60%" height={20} borderRadius="10px" />
                <HStack max justify="between">
                    <Skeleton width={160} height={36} borderRadius="50px" />
                    <Skeleton width={70} height={20} borderRadius="10px" />
                </HStack>
            </VStack>
        );
        return (
            <Card
                padding="24"
                border="middle"
                max
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            >
                {cardContent}
            </Card>
        );
    }

    const cardContent = (
        <>
            <Skeleton width="100%" height={150} borderRadius="20px" className={cls.img} />
            <VStack className={cls.info} gap="4">
                <Skeleton width="80%" height={40} className={cls.title} borderRadius="10px" />
                {/* <Skeleton width="40%" height={30} borderRadius="10px" /> */}
                <VStack gap="8" className={cls.footer} max>
                    <HStack justify="between" max>
                        <Skeleton width={100} height={20} borderRadius="10px" />
                        <Skeleton width={70} height={20} borderRadius="10px" />
                    </HStack>
                    <HStack gap="8">
                        <Skeleton className={cls.avatar} width={32} height={32} borderRadius="50%" />
                        <Skeleton width={100} height={20} borderRadius="10px" />
                    </HStack>
                </VStack>
            </VStack>
        </>
    );

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card border="middle" className={cls.card} padding="0">
                {cardContent}
            </Card>
        </div>
    );
});
