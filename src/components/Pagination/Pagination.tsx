import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
    onPageChange: React.Dispatch<React.SetStateAction<number>>;
    pageCount: number;
}

const Pagination: FC<PaginationProps> = ({ onPageChange, pageCount }) => {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<ChevronRightIcon />}
            onPageChange={(event) => {
                onPageChange(event.selected + 1);
            }}
            pageCount={pageCount}
            previousLabel={<ChevronLeftIcon />}
            pageClassName="page-item"
            previousClassName="page-item page-item-side"
            nextClassName="page-item page-item-side"
            breakClassName="page-item"
            containerClassName="pagination"
            activeClassName="page-item-active"
        />
    );
};

export default Pagination;
