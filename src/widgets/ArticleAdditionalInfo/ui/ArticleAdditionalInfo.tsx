import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleAdditionalInfo.module.scss';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

interface ArticleAdditionalInfoProps {
    className?: string;
    author?: User;
    createdAt?: string;
    views?: number;
    onEdit?: () => void;
    onCreate?: () => void;
}

export const ArticleAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit, onCreate } = props;
    const { t } = useTranslation('article');

    return (
        <VStack gap="32" className={classNames(cls.ArticleAdditionalInfo, {}, [className])}>
            <HStack gap="8">
                {author && <Avatar src={author.avatar} size={32} />}
                {author && <Text text={author.username} weight="bold" />}
                {createdAt && <Text text={createdAt} />}
            </HStack>
            <Button onClick={onEdit}>{t('edit_btn')}</Button>
            <Button onClick={onCreate}>{t('create_article')}</Button>
            <Text text={t('{{count}} views', { count: views })} />
        </VStack>
    );
});
