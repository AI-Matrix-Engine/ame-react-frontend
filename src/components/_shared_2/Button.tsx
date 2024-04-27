import { HTMLAttributes } from "react";

interface ButtonI extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    preset?: "primary" | "secondary";
}

const Button: React.FC<ButtonI> = ({ title, loading = false, disabled = false, preset = "primary", ...rest }) => {
    const presetStyles = {
        primary: "bg-primary text-white",
        secondary: "bg-offWhite text-textGrey border border-border",
    };

    const overrideStyles = presetStyles[preset] || {};

    return (
        <button className={`w-full font-semibold px-6 py-3 rounded-lg select-none ${overrideStyles}`} disabled={loading} {...rest}>
            <div className="flex justify-center items-center gap-4">{loading ? "Loading..." : title}</div>
        </button>
    );
};

export { Button };
