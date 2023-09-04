import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

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
    const {
        className, value, onChange, readonly,
    } = props;

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    return (
        <ListBox
            readonly={readonly}
            className={classNames('', {}, [className])}
            defaultValue={t('currency')}
            label={t('currency')}
            value={value}
            items={options}
            onChange={onChangeHandler}
            direction="top right"
        />
    );
    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('currency')}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});
