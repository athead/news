import { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}
interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: T;
    onTabClick: (tab: TabItem<T>) => void;
}

/**
 * Компонент устарел, необходимо использовать redesigned
 * @deprecated
 */
export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, onTabClick, tabs, value } = props;

    const clickHandler = useCallback(
        (tab: TabItem<T>) => {
            return () => {
                onTabClick(tab);
            };
        },
        [onTabClick],
    );

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => {
                return (
                    <Card
                        theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                        className={cls.tab}
                        key={tab.value}
                        onClick={clickHandler(tab)}
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </div>
    );
};
