import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { Button } from '@/shared/ui/Button';

interface LangSwitcherProps {
    short?: boolean;
    className?: string;
}

export const LangSwitcher = memo(({ short, className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            variant="clear"
            className={className}
            onClick={() => {
                return toggleLanguage();
            }}
        >
            {t(short ? 'button_lang_short' : 'button_lang')}
        </Button>
    );
});
