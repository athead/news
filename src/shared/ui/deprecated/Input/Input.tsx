import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    type?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
}
/**
 * Компонент устарел, необходимо использовать redesigned
 * @deprecated
 */
export const Input = memo((props: InputProps) => {
    const { className, value, onChange, type = 'text', placeholder, autofocus, readonly, ...otherProps } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
        }
    }, [autofocus]);

    const mods: Mods = {
        [cls.readonly]: readonly,
    };
    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            <input
                ref={ref}
                className={cls.input}
                type={type}
                value={value}
                onChange={onChangeHandler}
                placeholder={placeholder}
                readOnly={readonly}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...otherProps}
            />
        </div>
    );
});
