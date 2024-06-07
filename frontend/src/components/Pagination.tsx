import { FC } from "react";
import { Button } from "./Button"

interface PaginationProps {
    totalPost: any;
    paginate: (number: number) => void;
    postPerPage: number;
}

const Pagination: FC<PaginationProps> = ({totalPost, paginate, postPerPage}) => {
    const pageNumbers: number [] = []

    for(let i = 1; i <= Math.ceil(totalPost/postPerPage); i++){
      pageNumbers.push(i)
    }

    const handleClick = (pageNumber: number) => {
      paginate(pageNumber)
    }

    return (
      <div className="flex justify-center items-center my-8">
        <nav className="flex gap-2">
          <div className="flex gap-2">
            {pageNumbers.map((number) => {
                return (
                    <div key={number} >
                        <Button
                            children={`${number}`}
                            className={`px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:bg-gray-200 focus:text-gray-700`}
                            onClick={() => handleClick(number)}
                        />
                    </div>
                )
            })}
          </div>
        </nav>
      </div>
    )
}

export default Pagination