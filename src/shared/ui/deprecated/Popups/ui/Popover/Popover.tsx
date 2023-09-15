import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import popupCls from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';

interface PopoverProps {
    className?: string;
    children: ReactNode;
    trigger: ReactNode;
    direction?: DropdownDirection;
}
/**
 * Компонент устарел, необходимо использовать redesigned
 * @deprecated
 */
export function Popover(props: PopoverProps) {
    const { className, children, trigger, direction = 'bottom right' } = props;
    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover as="div" className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as="div" className={popupCls.trigger}>{trigger}</HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>{children}</HPopover.Panel>
        </HPopover>
    );
}
