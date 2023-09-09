import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import HomeIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/book.svg';
import { SidebarItemType } from '../types/sidebar';
import { RoutePath } from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
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
    ];
    if (userData) {
        sidebarItemList.push(
            {
                path: RoutePath.profile + userData.id,
                Icon: ProfileIcon,
                text: 'navbar_profile',
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                Icon: ArticlesIcon,
                text: 'navbar_articles',
                authOnly: true,
            },
        );
    }
    return sidebarItemList;
});
