import {
    ArticleCodeBlockComponent,
    ArticleTextBlockComponent,
    ArticleImageBlockComponent,
    ArticleBlock,
    ArticleBlockType,
} from '@/entities/Article';
import cls from './ArticleEditor.module.scss';
import i18n from '@/shared/config/i18n/i18n';

export const renderArticleBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    data-block="code"
                    key={block.id}
                    className={cls.block}
                    block={block}
                    editable
                    placeholder={i18n.t('input code here')}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    data-block="text"
                    key={block.id}
                    className={cls.block}
                    block={block}
                    editable
                    placeholder={i18n.t('input text here')}
                />
            );
        case ArticleBlockType.TITLE:
            return (
                <ArticleTextBlockComponent
                    data-block="title"
                    key={block.id}
                    size="l"
                    className={cls.block}
                    block={block}
                    editable
                    placeholder={i18n.t('input title here')}
                />
            );
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent data-block="image" key={block.id} className={cls.block} block={block} />;
        default:
            return null;
    }
};
