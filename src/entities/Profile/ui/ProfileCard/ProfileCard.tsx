import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Profile } from '../../model/types/profile';

export interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

const ProfileCardSkeleton = () => {
    return (
        <Card border="middle" padding="24" max>
            <VStack gap="32">
                <HStack max justify="center">
                    <Skeleton borderRadius="100%" width={128} height={128} />
                </HStack>
                <HStack gap="32" max>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                    </VStack>

                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                        <Skeleton width="100%" height={38} borderRadius="48px" />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const ProfileCard = memo((props: ProfileCardProps) => {
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
        isLoading,
        error,
    } = props;
    const { t } = useTranslation('profile');

    if (isLoading) {
        return <ProfileCardSkeleton />;
    }

    if (error) {
        return (
            <HStack justify="center" max>
                <Text
                    variant="error"
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align="center"
                />
            </HStack>
        );
    }

    return (
        <Card border="middle" padding="24" max className={className}>
            <VStack gap="32">
                {data?.avatar && (
                    <HStack justify="center" max>
                        <Avatar size={128} src={data?.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            onChange={onChangeUsername}
                            value={data?.username}
                            placeholder={t('username')}
                            label={t('username')}
                            readonly={readonly}
                            data-testid="ProfileCard.username"
                        />
                        <Input
                            onChange={onChangeAvatar}
                            value={data?.avatar}
                            placeholder={t('avatar')}
                            label={t('avatar')}
                            readonly={readonly}
                        />

                        <Input
                            onChange={onChangeFirstname}
                            value={data?.firstname}
                            placeholder={t('firstname')}
                            label={t('firstname')}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            onChange={onChangeLastname}
                            value={data?.lastname}
                            placeholder={t('lastname')}
                            label={t('lastname')}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            onChange={onChangeAge}
                            value={data?.age}
                            type="number"
                            placeholder={t('age')}
                            label={t('age')}
                            readonly={readonly}
                        />
                        <Input
                            onChange={onChangeCity}
                            value={data?.city}
                            placeholder={t('city')}
                            label={t('city')}
                            readonly={readonly}
                        />
                        <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
                        <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
