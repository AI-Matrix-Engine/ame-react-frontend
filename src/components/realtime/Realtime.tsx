// pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import { socketService } from "@/lib/socket";

const Realtime = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    socketService.init();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return <Component {...pageProps} />;
};

export default Realtime;
