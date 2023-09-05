import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: React.JSX.Element;
    roles?: UserRole[];
}
export function RequireAuth(props: RequireAuthProps) {
    const { children, roles } = props;
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    const userRoles = useSelector(getUserRoles);
    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        // user is not authenticated -> redirect
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
