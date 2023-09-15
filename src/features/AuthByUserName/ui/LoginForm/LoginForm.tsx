import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginisLoading } from '../../model/selectors/getLoginisLoading/getLoginisLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    // const dispatch = useDispatch<ThunkDispatch<StateSchema, null, PayloadAction<string>>>();
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginisLoading);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') onSuccess();
    }, [onSuccess, dispatch, username, password]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack gap="8" className={classNames(cls.LoginForm, {}, [className])}>
                        <Text title={t('login_form')} />
                        {error && <Text text={error} variant="error" />}

                        <Input
                            onChange={onChangeUsername}
                            value={username}
                            type="text"
                            className={cls.input}
                            placeholder={t('input_login')}
                            autofocus
                        />
                        <Input
                            onChange={onChangePassword}
                            value={password}
                            type="text"
                            className={cls.input}
                            placeholder={t('input_password')}
                        />
                        <Button onClick={onLoginClick} disabled={isLoading} className={cls.loginBtn}>
                            {t('login')}
                        </Button>
                    </VStack>
                }
                off={
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('login_form')} />
                        {error && <TextDeprecated text={error} theme={TextTheme.ERROR} />}
                        <InputDeprecated
                            onChange={onChangeUsername}
                            value={username}
                            type="text"
                            className={cls.input}
                            placeholder={t('input_login')}
                            autofocus
                        />
                        <InputDeprecated
                            onChange={onChangePassword}
                            value={password}
                            type="text"
                            className={cls.input}
                            placeholder={t('input_password')}
                        />
                        <ButtonDeprecated
                            onClick={onLoginClick}
                            disabled={isLoading}
                            theme={ButtonTheme.OUTLINE}
                            className={cls.loginBtn}
                        >
                            {t('login')}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
