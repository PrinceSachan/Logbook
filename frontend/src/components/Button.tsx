import { MouseEvent } from "react";
import { cn } from '../utils/cn'
interface ButtonType {
    children: string;
    type? : "submit" | "reset" | "button" ;
    onClick?: (e : MouseEvent<HTMLButtonElement>) => void;
    className: string
}

// button component
export const Button = ({children, onClick, type, className}: ButtonType) => {
    return (
        <div>
            <button 
                onClick={onClick} 
                className={cn(`text-white focus:outline-none font-medium text-sm px-5 text-center`, className)}
                type={type}
            >{children}</button>
        </div>
    )
}