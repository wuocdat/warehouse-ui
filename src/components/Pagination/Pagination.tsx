import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, Select, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import ReactPaginate from "react-paginate";
import { PAGINATION_TEXT } from "utils/constants";
import "./Pagination.css";

interface PaginationProps {
    onPageChange: React.Dispatch<React.SetStateAction<number>>;
    pageSize: number;
    onSizeChange: React.Dispatch<React.SetStateAction<number>>;
    total: number;
}

const Pagination: FC<PaginationProps> = ({
    onPageChange,
    pageSize,
    onSizeChange,
    total,
}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onSizeChange(+event.target.value);
    };
    return (
        <HStack spacing={4} justify="end" p={4}>
            <HStack>
                <Text>{PAGINATION_TEXT.DISPLAY}</Text>
                <Select
                    size="sm"
                    w="auto"
                    value={pageSize}
                    onChange={handleChange}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </Select>
                <Text>{PAGINATION_TEXT.RESULT}</Text>
            </HStack>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<ChevronRightIcon />}
                onPageChange={(event) => {
                    onPageChange(event.selected + 1);
                }}
                pageCount={Math.ceil(total / pageSize)}
                previousLabel={<ChevronLeftIcon />}
                pageClassName="page-item"
                previousClassName="page-item page-item-side"
                nextClassName="page-item page-item-side"
                breakClassName="page-item"
                containerClassName="pagination"
                activeClassName="page-item-active"
            />
        </HStack>
    );
};

export default Pagination;
