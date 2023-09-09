import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';
import cls from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/consts/consts';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;
    if (view === ArticleView.BLOCK) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} borderRadius="50%" />
                        <Skeleton width={150} height={16} borderRadius="12px" className={cls.username} />
                        <Skeleton width={150} height={16} borderRadius="12px" className={cls.date} />
                    </div>
                    <Skeleton width={250} height={24} borderRadius="12px" className={cls.tilte} />
                    <Skeleton height={200} borderRadius="12px" className={cls.img} />
                    <div className={cls.footer}>
                        <Skeleton width={36} height={24} borderRadius="12px" />
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <Skeleton width={200} height={200} className={cls.img} borderRadius="12px" />
                </div>
                <div className={cls.infoWrapper}>
                    <Skeleton width={130} height={16} borderRadius="12px" />
                </div>
                <Skeleton width={150} height={16} className={cls.title} borderRadius="12px" />
            </Card>
        </div>
    );
});
