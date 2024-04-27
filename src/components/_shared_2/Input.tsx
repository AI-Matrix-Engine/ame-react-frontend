import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputI extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    icon?: ReactNode;
    overrideStyles?: string;
}

const Input = forwardRef<HTMLInputElement, InputI>(
    ({ label, placeholder, disabled = false, value = "", icon, overrideStyles = "", ...rest }, ref) => {
        return (
            <div className="flex flex-col">
                {label && <label className="font-normal text-sm leading-6 text-charoalBlack mb-2">{label}</label>}

                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center">{icon}</span>
                    <input
                        ref={ref}
                        className={`w-full ${icon && "pl-16"
                            } px-4 py-3 rounded-lg min-h-12 border border-border bg-white outline-none placeholder:text-textGrey text-charoalBlack ${overrideStyles}`}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        {...rest}
                    />
                </div>
            </div>
        );
    }
);

export { Input };
