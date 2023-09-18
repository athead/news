import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleAdditionalInfo.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ArticleAdditionalInfoSkeleton = memo(() => {
    return (
        <VStack gap="32" className={classNames(cls.ArticleAdditionalInfo, {}, [])}>
            <HStack gap="8">
                <Skeleton width={32} height={32} borderRadius="50%" />
                <Skeleton width={50} height={20} borderRadius="12px" />
                <Skeleton width={100} height={20} borderRadius="12px" />
            </HStack>
            <Skeleton width={120} height={38} borderRadius="242px" />
            <Skeleton width={80} height={20} borderRadius="12px" />
        </VStack>
    );
});
