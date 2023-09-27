import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock, ArticleTitleBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { ArticleBlockType } from '../../model/consts/consts';

type inputSize = 'xl' | 'l' | 'm' | 's';
interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock | ArticleTitleBlock;
    placeholder?: string;
    editable?: boolean;
    initedValue?: string;
    size?: inputSize;
    onChange?: (value: string) => void;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block, editable, onChange, initedValue, placeholder, size = 'm', ...otherProps } = props;
    const [text, setText] = useState(initedValue);

    const onChangeHandler = useCallback(
        (value: string) => {
            setText(value);
            onChange?.(value);
        },
        [onChange],
    );
    if (editable) {
        return (
            <Input
                {...otherProps}
                variant="clear"
                onChange={onChangeHandler}
                value={text}
                placeholder={placeholder}
                size={size}
            />
        );
    }

    let content;
    if (block.type === ArticleBlockType.TITLE) {
        content = <Text title={block.title} className={cls.title} />;
    } else if (block.type === ArticleBlockType.TEXT) {
        content = <Text text={block.text} className={cls.text} />;
    }
    return (
        <div {...otherProps} data-block="text" className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {/* {block.title && <Text title={block.title} className={cls.title} />}
            {block.paragraphs.map((paragraph) => {
                return <Text key={paragraph} text={paragraph} className={cls.paragraph} />;
            })} */}
            {content}
        </div>
    );
});
