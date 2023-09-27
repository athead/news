/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import cls from './ArticleBlockEditor.module.scss';

const EDITTOR_HOLDER_ID = 'editorjs';

type ArticleBlockEditorProps = {
    data?: OutputData;
    onChange(val: OutputData): void;
};

export const ArticleBlockEditor = (props: ArticleBlockEditorProps) => {
    const { data, onChange } = props;
    const ejInstance = useRef<EditorJS>();
    // const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITTOR_HOLDER_ID,
            // logLevel: LogLevels.ERROR,
            data,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async (api) => {
                const content = await api.saver.save();
                // Put your logic here to save this data to your DB
                onChange(content);
            },
            // autofocus: true,
            // tools: {
            //     header: Header,
            // },
        });
    };

    // This will run only once
    useEffect(() => {
        if (!ejInstance.current) {
            initEditor();
        }
        return () => {
            if (ejInstance.current && ejInstance.current.destroy) {
                ejInstance.current.destroy();
            }
        };
    }, []);

    return <div className={cls.ArticleBlockEditor} id={EDITTOR_HOLDER_ID} />;
};
