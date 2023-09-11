import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import HomeIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/book.svg';
import { SidebarItemType } from '../types/sidebar';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: HomeIcon,
            text: 'navbar_mainpage',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'navbar_about',
        },
    ];
    if (userData) {
        sidebarItemList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'navbar_profile',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: ArticlesIcon,
                text: 'navbar_articles',
                authOnly: true,
            },
        );
    }
    return sidebarItemList;
});
