// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { socketService } from '@/lib/socket';

const MyApp = ({ Component, pageProps }: AppProps) => {
    React.useEffect(() => {
        socketService.init(user?.token ? user.token : "", user?.uid ? user.uid : "");

        return () => {
            socketService.disconnect();
        };
    }, []);

    return <Component {...pageProps} />;
};

export default MyApp;
