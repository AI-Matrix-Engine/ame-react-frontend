type IconType = {
    className?: string;
    color?: string;
};

export const Icons: any = {
    sendMsg: ({ className, color }: IconType) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color ?? "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M7 11L12 6L17 11M12 18V7" className={className} />
        </svg>

    ),
};