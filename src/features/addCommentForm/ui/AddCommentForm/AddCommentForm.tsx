import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};
const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);
    // const error = useSelector(getAddCommentFormError);

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onSendComment, onCommentTextChange, text]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Card padding="24" border="middle" max>
                <HStack
                    data-testid="AddCommentForm"
                    gap="16"
                    justify="between"
                    max
                    className={classNames(cls.AddCommentForm, {}, [className])}
                >
                    <Input
                        data-testid="AddCommentForm.Input"
                        className={cls.input}
                        value={text}
                        onChange={onCommentTextChange}
                        placeholder={t('new_comment_text')}
                    />
                    <Button data-testid="AddCommentForm.Button" onClick={onSendHandler}>
                        {t('add_comment_btn')}
                    </Button>
                </HStack>
            </Card>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
