import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button
                    variant="clear"
                    onClick={() => {
                        return toggleLanguage();
                    }}
                >
                    {t(short ? 'button_lang_short' : 'button_lang')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    onClick={() => {
                        return toggleLanguage();
                    }}
                    className={classNames('', {}, [className])}
                >
                    {/* i18next-extract-disable-next-line */}
                    {t(short ? 'button_lang_short' : 'button_lang')}
                </ButtonDeprecated>
            }
        />
    );
});
