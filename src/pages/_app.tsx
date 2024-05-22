// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { socketService } from '@/lib/socket';
import { useAuth } from '@/context/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { user } = useAuth();
    React.useEffect(() => {
        socketService.init(user?.token ? user.token : "", user?.uid ? user.uid : "");

        return () => {
            socketService.disconnect();
        };
    }, []);

    return <Component {...pageProps} />;
};

export default MyApp;
