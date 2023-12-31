import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './AboutPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const AboutPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation('about');
    return (
        <Page data-testid="AboutPage" className={classNames(cls.AboutPage, {}, [className])}>
            {t('about_page')}
        </Page>
    );
};

export default AboutPage;
