import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();

    return (
        <HStack justify="center" max className={classNames(cls.ProfileCard, {}, [cls.error])}>
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack justify="center" max className={classNames(cls.ProfileCard, { [cls.loading]: true })}>
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack gap="8" max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="center" max className={cls.avatarWrapper}>
                    <AvatarDeprecated src={data?.avatar} />
                </HStack>
            )}
            <InputDeprecated
                onChange={onChangeUsername}
                value={data?.username}
                placeholder={t('username')}
                className={cls.input}
                readonly={readonly}
                data-testid="ProfileCard.username"
            />
            <InputDeprecated
                onChange={onChangeAvatar}
                value={data?.avatar}
                placeholder={t('avatar')}
                className={cls.input}
                readonly={readonly}
            />

            <InputDeprecated
                onChange={onChangeFirstname}
                value={data?.firstname}
                placeholder={t('firstname')}
                className={cls.input}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
            />
            <InputDeprecated
                onChange={onChangeLastname}
                value={data?.lastname}
                placeholder={t('lastname')}
                className={cls.input}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
            />
            <InputDeprecated
                onChange={onChangeAge}
                value={data?.age}
                type="number"
                placeholder={t('age')}
                className={cls.input}
                readonly={readonly}
            />
            <InputDeprecated
                onChange={onChangeCity}
                value={data?.city}
                placeholder={t('city')}
                className={cls.input}
                readonly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect className={cls.input} value={data?.country} onChange={onChangeCountry} readonly={readonly} />
        </VStack>
    );
});
