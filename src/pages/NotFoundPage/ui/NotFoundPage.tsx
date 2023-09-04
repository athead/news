import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/ui/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = (props: NotFoundPageProps) => {
    const { className } = props;
    const { t } = useTranslation('notfound');
    return <Page className={classNames(cls.NotFoundPage, {}, [className])}>{t('notfound_page')}</Page>;
};

export default NotFoundPage;
