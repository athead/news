import { ReactNode, Fragment } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './ListBox.module.scss';
import { Button } from '../../../Button';

import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '../../../../redesigned/Stack';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}
/**
 * Компонент устарел, необходимо использовать redesigned
 * @deprecated
 */
export function ListBox(props: ListBoxProps) {
    const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom left', label } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="4">
            {label && <span>{label}</span>}
            <HListbox
                disabled={readonly}
                as="div"
                value={value}
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
                onChange={onChange}
            >
                <HListbox.Button className={popupCls.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListbox.Button>
                <HListbox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => {
                        return (
                            <HListbox.Option key={item.value} value={item.value} disabled={item.disabled} as={Fragment}>
                                {({ active, selected }) => {
                                    return (
                                        <li
                                            className={classNames(cls.item, {
                                                [popupCls.active]: active,
                                                [popupCls.disabled]: item.disabled,
                                            })}
                                        >
                                            {selected && '!!!'}
                                            {item.content}
                                        </li>
                                    );
                                }}
                            </HListbox.Option>
                        );
                    })}
                </HListbox.Options>
            </HListbox>
        </HStack>
    );
}
