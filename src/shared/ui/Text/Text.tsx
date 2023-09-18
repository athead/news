import { JSXElementConstructor, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

export type TextStyle = 'normal' | 'bold' | 'black';

export type TextClamp = 'normal' | '1' | '2' | '3';

type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    weight?: TextStyle;
    /**
     * Позволяет явно определить сколько строк может содержать текст. Остальные будут заменяться на ...
     */
    clamp?: TextClamp;
    /**
     * Позволяет задать тег, в котором будет компонент. По умолчанию помещается пропс text со стилем className
     */
    as?: ReactTag;
    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapClampToClass: Record<TextClamp, string> = {
    normal: '',
    '1': cls.clamp_1,
    '2': cls.clamp_2,
    '3': cls.clamp_3,
};

const mapSizeToClass: Record<TextSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        weight = 'normal',
        clamp = 'normal',
        as: TextTag,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];
    const clampClass = mapClampToClass[clamp];

    const additionalClasses = [className, cls[variant], cls[align], sizeClass, cls[weight]];

    if (TextTag) {
        return <TextTag className={className}>{text}</TextTag>;
    }
    return (
        <div className={classNames(cls.Text, {}, additionalClasses)}>
            {title && (
                <HeaderTag className={classNames(cls.title, {}, [clampClass])} data-testid={`${dataTestId}.Header`}>
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={classNames(cls.text, {}, [clampClass])} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    );
});
