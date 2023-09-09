import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    /* i18next-extract-disable-next-line */
    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={() => {
                return toggleLanguage();
            }}
            className={classNames('', {}, [className])}
        >
            {/* i18next-extract-disable-next-line */}
            {t(short ? 'button_lang_short' : 'button_lang')}
        </Button>
    );
});
