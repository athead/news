import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NotificationList } from '@/entities/Notification';

import NotificationIcon from '@/shared/assets/icons/bell.svg';
import { Drawer } from '@/shared/ui/Drawer';
import cls from './NotificationButton.module.scss';
import { DropdownDirection } from '@/shared/types/ui';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

interface NotificationButtonProps {
    className?: string;
    direction?: DropdownDirection;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className, direction = 'bottom left' } = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />;

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationButton, {}, [className])}
                    direction={direction}
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});
