import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

import NotificationIcon from 'shared/assets/icons/bell.svg';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom left"
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon size="30" Svg={NotificationIcon} inverted />
                </Button>
            )}
        >
            <NotificationList className={cls.notifications} />
        </Popover>
    );
});
