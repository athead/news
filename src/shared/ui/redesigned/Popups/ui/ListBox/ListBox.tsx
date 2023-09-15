import { ReactNode, Fragment, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './ListBox.module.scss';
import { Button } from '../../../Button';
import CheckedIcon from '@/shared/assets/icons/check.svg';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '../../../../redesigned/Stack';
import ArrowIcon from '@/shared/assets/icons/arrow.svg';
import { Icon } from '../../../Icon';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange?: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom left', label } = props;

    const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

    const selectedItem = useMemo(() => {
        return items?.find((item) => {
            return item.value === value;
        });
    }, [items, value]);

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
                {({ open }) => {
                    return (
                        <>
                            <HListbox.Button 
                                as={Button}
                                variant="filled"
                                muted={readonly}
                                addonRight={
                                    <Icon
                                        Svg={ArrowIcon}
                                        className={classNames(cls.dropdownIcon, { [cls.opened]: open }, [])}
                                    />
                                }
                            >
                                {selectedItem?.content ?? defaultValue}
                            </HListbox.Button>
                            <HListbox.Options className={classNames(cls.options, {}, optionsClasses)}>
                                {items?.map((item) => {
                                    return (
                                        <HListbox.Option
                                            key={item.value}
                                            value={item.value}
                                            disabled={item.disabled}
                                            as={Fragment}
                                        >
                                            {({ active, selected }) => {
                                                return (
                                                    <li
                                                        className={classNames(cls.item, {
                                                            [popupCls.active]: active,
                                                            [popupCls.disabled]: item.disabled,
                                                            [popupCls.selected]: selected,
                                                        })}
                                                    >
                                                        {selected && (
                                                            <Icon Svg={CheckedIcon} className={cls.checkedIcon} />
                                                        )}
                                                        {item.content}
                                                    </li>
                                                );
                                            }}
                                        </HListbox.Option>
                                    );
                                })}
                            </HListbox.Options>
                        </>
                    );
                }}
            </HListbox>
        </HStack>
    );
}
