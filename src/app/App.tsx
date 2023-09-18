import React, { Suspense, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserIsInit, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const userInited = useSelector(getUserIsInit);
    const toolbar = useAppToolbar();

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!userInited) {
        return (
            <div id="app" className={classNames('app', {}, [theme])}>
                <AppLoaderLayout />
            </div>
        );
    }
    return (
        <div id="app" className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <MainLayout header={<Navbar />} content={<AppRouter />} sidebar={<Sidebar />} toolbar={toolbar} />
            </Suspense>
        </div>
    );
});

export default withTheme(App);
