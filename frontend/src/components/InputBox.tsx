import { ChangeEvent } from "react";

interface InputType {
    type? : string;
    label: string;
    placeHolderName: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = ({type, label, placeHolderName, onChange}: InputType) => {
    return (
        <div>
            <div className="text-sm font-semibold py-2 text-left">{label}</div>
                <input 
                    type={type}
                    className="block w-full  border border-gray-300 rounded-lg outline-none focus:border-slate-900 focus:border-2 p-2 text-slate-700"
                    placeholder={placeHolderName}
                    onChange={onChange}
                />
        </div>
    )
}