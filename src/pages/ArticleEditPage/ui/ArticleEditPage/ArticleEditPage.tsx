import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;

    const { id } = useParams<{ id: string }>();
    // eslint-disable-next-line
    const isEdit = Boolean(id);
    // eslint-disable-next-line
    return <div className={classNames('', {}, [className])}>ARTICLE EDIT</div>;
});

export default ArticleEditPage;
