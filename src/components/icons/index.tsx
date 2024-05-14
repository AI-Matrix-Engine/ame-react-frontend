import React from "react";
import { Icons } from "./resolver";

type IconPropTypes = {
    name: string;
    className?: string;
    color?: string;
};

const Icon = ({ name, className, color }: IconPropTypes) => {
    const IconSVG = Icons[name];
    return <IconSVG className={`${className} aspect-square`} color={color} />;
};

export default Icon;