import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Currency } from '../../model/types/currency';
import { ListBox } from '@/shared/ui/Popups';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    readonly?: boolean;
    onChange?: (value: Currency) => void;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];
export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { t } = useTranslation();
    const { className, value, onChange, readonly } = props;

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    const itemProps = {
        readonly,
        className,
        defaultValue: t('currency'),
        label: t('currency'),
        value,
        items: options,
        onChange: onChangeHandler,
        direction: 'top right' as const,
    };
    return <ListBox {...itemProps} />;
});
