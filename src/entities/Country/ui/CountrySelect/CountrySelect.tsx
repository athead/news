import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';
import { ListBox } from '@/shared/ui/Popups';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    readonly?: boolean;
    onChange?: (value: Country) => void;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
];
export const CountrySelect = memo((props: CountrySelectProps) => {
    const { t } = useTranslation();
    const { className, value, onChange, readonly } = props;

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    const itemProps = {
        readonly,
        className,
        defaultValue: t('country'),
        label: t('country'),
        value,
        items: options,
        onChange: onChangeHandler,
        direction: 'top right' as const,
    };

    return <ListBox {...itemProps} />;

    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('country')}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});
