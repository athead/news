import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface EditableProfileCardHeaderProps {
    className?: string;
    isLoading?: boolean;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');
    const { className, isLoading } = props;
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readOnly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSaveEdit = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    if (isLoading) {
        return (
            <Card border="middle" padding="24" max>
                <HStack max justify="between" className={classNames('', {}, [className])}>
                    <Text title={t('profile_card')} />
                    <Skeleton width={160} height={38} borderRadius="48px" />
                </HStack>
            </Card>
        );
    }
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card border="middle" padding="24" max>
                    <HStack max justify="between" className={classNames('', {}, [className])}>
                        <Text title={t('profile_card')} />
                        {canEdit && (
                            <div>
                                {readOnly ? (
                                    <Button onClick={onEdit} data-testid="EditableProfileCardHeader.EditButton">
                                        {t('button_edit')}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button
                                            onClick={onCancelEdit}
                                            color="error"
                                            data-testid="EditableProfileCardHeader.CancelButton"
                                        >
                                            {t('button_cancel')}
                                        </Button>
                                        <Button
                                            onClick={onSaveEdit}
                                            color="success"
                                            data-testid="EditableProfileCardHeader.SaveButton"
                                        >
                                            {t('button_save')}
                                        </Button>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                </Card>
            }
            off={
                <HStack max justify="between" className={classNames('', {}, [className])}>
                    <TextDeprecated title={t('profile_card')} />
                    {canEdit && (
                        <div>
                            {readOnly ? (
                                <ButtonDeprecated
                                    onClick={onEdit}
                                    theme={ButtonTheme.OUTLINE}
                                    data-testid="EditableProfileCardHeader.EditButton"
                                >
                                    {t('button_edit')}
                                </ButtonDeprecated>
                            ) : (
                                <HStack gap="8">
                                    <ButtonDeprecated
                                        onClick={onCancelEdit}
                                        theme={ButtonTheme.OUTLINE_RED}
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                    >
                                        {t('button_cancel')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        onClick={onSaveEdit}
                                        theme={ButtonTheme.OUTLINE}
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                    >
                                        {t('button_save')}
                                    </ButtonDeprecated>
                                </HStack>
                            )}
                        </div>
                    )}
                </HStack>
            }
        />
    );
});
