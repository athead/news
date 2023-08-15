import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');
    const { className } = props;
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

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('profile_card')} />
            {readOnly ? (
                <Button onClick={onEdit} className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
                    {t('button_edit')}
                </Button>
            ) : (
                <>
                    <Button
                        onClick={onCancelEdit}
                        theme={ButtonTheme.OUTLINE_RED}
                        className={cls.editBtn}
                    >
                        {t('button_cancel')}
                    </Button>
                    <Button onClick={onSaveEdit} className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
                        {t('button_save')}
                    </Button>
                </>
            )}
        </div>
    );
};
