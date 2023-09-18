import { memo, useCallback, useEffect } from 'react';
import hljs from 'highlight.js';
import './CodeStyle.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon/Icon';
import cls from './Code.module.scss';
import copyIcon from '@/shared/assets/icons/copy.svg';

interface CodeProps {
    className?: string;
    text: string;
    ident?: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text, ident } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Icon Svg={copyIcon} width={40} height={40} clickable
className={cls.copyBtn} onClick={onCopy} />
            <code className="language-javascript" id={ident}>
                {text}
            </code>
        </pre>
    );
});
