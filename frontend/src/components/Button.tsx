import { MouseEvent } from "react";

interface ButtonType {
    label: string;
    type? : "submit" | "reset" | "button" ;
    onClick: (e : MouseEvent<HTMLButtonElement>) => void
}

// button component
export const Button = ({label, onClick, type}: ButtonType) => {
    return (
        <div>
            <button 
                onClick={onClick} 
                className="w-full text-white hover:bg-gray-800 bg-gray-900 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 me-2 mt-4 mb-2"
                type={type}
            >{label}</button>
        </div>
    )
}