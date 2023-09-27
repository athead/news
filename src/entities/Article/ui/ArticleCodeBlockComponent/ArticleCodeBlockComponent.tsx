import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';
import { Code } from '@/shared/ui/Code';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
    editable?: boolean;
    placeholder?: string;
    initialValue?: string;
    onChange?: (value: string) => void;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, block, editable, onChange, initialValue, placeholder, ...otherProps } = props;

    return (
        <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
            <Code
                text={block.code}
                editable={editable}
                onChange={onChange}
                initialValue={initialValue}
                placeholder={placeholder}
                 {...otherProps} 
            />
        </div>
    );
});
