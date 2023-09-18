import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LangSwitcher } from '@/features/LangSwitcher';
import { VStack } from '@/shared/ui/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Icon } from '@/shared/ui/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow.svg';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const SidebarItemList = useSelector(getSidebarItems);
    const [collapsed, setCollapsed] = useState(false);
    const onToggle = () => {
        setCollapsed((prev) => {
            return !prev;
        });
    };

    const itemsList = useMemo(() => {
        return SidebarItemList.map((item) => {
            return <SidebarItem key={item.path} item={item} collapsed={collapsed} />;
        });
    }, [collapsed, SidebarItemList]);

    return (
        <aside data-testid="sidebar" className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            <Icon
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                Svg={ArrowIcon}
                clickable
            />
            <div className={cls.switchers}>
                <ThemeSwitcher className={cls.themeSwitcher} />
                <LangSwitcher short={collapsed} className={cls.langSwitcher} />
            </div>
        </aside>
    );
});
