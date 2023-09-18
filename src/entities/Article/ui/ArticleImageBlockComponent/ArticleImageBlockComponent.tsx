import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    // const { t } = useTranslation();

    return (
        <VStack
            as="figure"
            max
            gap="8"
            align="center"
            className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
        >
            <AppImage
                src={block.src}
                round="middle"
                fallback={<Skeleton width="100%" height={250} borderRadius="12px" />}
                alt={block.title}
                className={cls.img}
            />
            {block.title && <Text as="figcaption" text={block.title} align="center" className={cls.description} />}
        </VStack>
    );
});
