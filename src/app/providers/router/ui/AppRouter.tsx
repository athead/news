import React, { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        );
    }, []);
    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
            {/* {routes.map(({ path, element }) => {
                return (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <div className="page-wrapper">{element}</div>
                            </Suspense>
                        }
                    />
                );
            })} */}
        </Routes>
    );
};

export default memo(AppRouter);
