import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { User } from '@/entities/User';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

interface UserInfoProps {
    user?: User;
}
const UserInfo = memo((props: UserInfoProps) => {
    if (!props.user) return null;
    const { avatar, username } = props.user;
    return (
        <>
            <Avatar size={32} src={avatar} className={cls.avatar} />
            <Text weight="bold" text={username} />
        </>
    );
});

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();

    // const types = <Text text={article.type.join(', ')} className={cls.types} />;

    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );

    if (view === ArticleView.BLOCK) {
        const textBlock = article.blocks?.find((block) => {
            return block.type === ArticleBlockType.TEXT;
        }) as ArticleTextBlock;

        return (
            <Card
                padding="24"
                border="middle"
                max
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            >
                <VStack max gap="16">
                    <HStack gap="8" max>
                        <UserInfo user={article.user} />
                        <Text text={article.createdAt} />
                    </HStack>
                    <Text title={article.title} weight="bold" />
                    <Text title={article.subtitle} size="s" />
                    <AppImage
                        round="middle"
                        fallback={<Skeleton width="100%" height={250} borderRadius="12px" />}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {/* {textBlock?.paragraphs && (
                        <Text className={cls.textBlock} text={textBlock.paragraphs.slice(0, 2).join(' ')} />
                    )} */}
                    {textBlock?.text && <Text className={cls.textBlock} text={textBlock.text} />}
                    <HStack max justify="between">
                        <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                            <Button variant="outline">{t('read_more')}</Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card} border="middle" padding="0">
                <AppImage
                    fallback={<Skeleton width="100%" height={200} />}
                    alt={article.title}
                    src={article.img}
                    className={cls.img}
                />
                <VStack className={cls.info} gap="4">
                    <Text title={article.title} className={cls.title} weight="bold" clamp="2" />
                    <VStack gap="4" className={cls.footer} max>
                        <HStack justify="between" max>
                            <Text text={article.createdAt} className={cls.date} />
                            {views}
                        </HStack>
                        <HStack gap="4">
                            <UserInfo user={article.user} />
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
