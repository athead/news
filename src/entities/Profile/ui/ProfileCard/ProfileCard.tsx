import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/widgets/Loader/Loader';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { t } = useTranslation('profile');

    const {
        className,
        data,
        error,
        isLoading,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
        readonly,
    } = props;

    if (isLoading) {
        return (
            <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('loading_error')}
                    text={t('try_to_update_page')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack gap="8" max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="center" max>
                    <Avatar src={data?.avatar} alt={t('avatar')} />
                </HStack>
            )}
            <Input
                onChange={onChangeUsername}
                value={data?.username}
                placeholder={t('username')}
                className={cls.input}
                readonly={readonly}
                data-testid="ProfileCard.username"
            />
            <Input
                onChange={onChangeAvatar}
                value={data?.avatar}
                placeholder={t('avatar')}
                className={cls.input}
                readonly={readonly}
            />

            <Input
                onChange={onChangeFirstname}
                value={data?.firstname}
                placeholder={t('firstname')}
                className={cls.input}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
            />
            <Input
                onChange={onChangeLastname}
                value={data?.lastname}
                placeholder={t('lastname')}
                className={cls.input}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
            />
            <Input
                onChange={onChangeAge}
                value={data?.age}
                type="number"
                placeholder={t('age')}
                className={cls.input}
                readonly={readonly}
            />
            <Input
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
};
