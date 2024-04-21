// pages/RealTimeDataPage.tsx
import React, { useEffect, useState } from 'react';
import { socketService } from '@/lib/socket';

const RealTimeDataPage = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const socket = socketService.getSocket();
        if (socket) {
            socket.on('ai_response', (receivedData: any) => {
                console.log('Data received:', receivedData);
                setData(receivedData);
            });
        }

        return () => {
            socket?.off('ai_response');
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Data Stream</h1>
            {data && <p>Data: {JSON.stringify(data)}</p>}
        </div>
    );
};

export default RealTimeDataPage;
