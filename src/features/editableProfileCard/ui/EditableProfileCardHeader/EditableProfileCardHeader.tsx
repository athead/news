import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

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
    );
});
