import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import LightIcon from '@/shared/assets/icons/sun.svg';
import DarkIcon from '@/shared/assets/icons/moon.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={() => {
                return toggleTheme();
            }}
        >
            {theme === Theme.DARK ? <DarkIcon width="50px" /> : <LightIcon width="50px" />}
        </Button>
    );
});
