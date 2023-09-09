import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserIsInit, userActions } from '@/entities/User';
import { AppRouter } from './providers/router';

function App() {
    const dispatch = useDispatch();
    const userInited = useSelector(getUserIsInit);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {userInited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
