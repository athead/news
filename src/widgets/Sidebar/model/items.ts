import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import HomeIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        Icon: HomeIcon,
        text: 'navbar_mainpage',
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'navbar_about',
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: 'navbar_profile',
        authOnly: true,
    },
];
