import { memo, useCallback, useEffect, useRef, useState } from 'react';
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
    placeholder?: string;
    editable?: boolean;
    initialValue?: string;
    onChange?: (value: string) => void;
}

export const Code = memo((props: CodeProps) => {
    const { className, text, ident, editable, initialValue, placeholder, onChange, ...otherProps } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [codeText, setCodeText] = useState(initialValue || '');
    const [isOnInput, setIsOnInput] = useState(false);
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    useEffect(() => {
        hljs.configure({ ignoreUnescapedHTML: true });
        hljs.highlightAll();
    }, []);

    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCodeText(e.target.value);
        onChange?.(e.target.value);
    };

    const onTextBlur = useCallback(() => {
        setIsOnInput(false);
        hljs.highlightAll();
    }, []);

    const onTextFocus = useCallback(() => {
        textareaRef.current?.focus();
        setIsOnInput(true);
    }, []);

    if (editable) {
        return (
            <div className={cls.inputArea} {...otherProps}>
                <textarea
                    className={classNames(cls.textarea, { [cls.visible]: isOnInput || !(codeText && placeholder) }, [])}
                    value={codeText}
                    ref={textareaRef}
                    onBlur={onTextBlur}
                    onFocus={onTextFocus}
                    onChange={onTextChange}
                    placeholder={placeholder}
                />
                {codeText && (
                    <pre
                        role="presentation"
                        onClick={onTextFocus}
                        className={classNames(cls.CodePreview, { [cls.visible]: !isOnInput }, [className])}
                    >
                        <code className="language-javascript" id={ident}>
                            {codeText}
                        </code>
                    </pre>
                )}
            </div>
        );
    }
    return (
        <pre className={classNames(cls.Code, {}, [className])} {...otherProps}>
            <Icon Svg={copyIcon} width={40} height={40} clickable
className={cls.copyBtn} onClick={onCopy} />
            <code className="language-javascript" id={ident}>
                {text}
            </code>
        </pre>
    );
});
