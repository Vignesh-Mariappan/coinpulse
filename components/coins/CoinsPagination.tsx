"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ELLIPSIS, buildPageNumbers, cn } from "../../lib/utils";
import { useRouter } from "next/navigation";

const CoinsPagination = ({
  currentPage,
  totalPages,
  hasMorePages,
}: Pagination) => {
  const router = useRouter();

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    router.push(`/coins?page=${page}`);
  };

  const isLastPage = !hasMorePages || currentPage === totalPages;

  return (
    <Pagination id="coins-pagination">
      <PaginationContent className="pagination-content">
        <PaginationItem className="pagination-control prev">
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
            className={cn(
              currentPage > 1 ? "control-button" : "control-disabled",
            )}
          />
        </PaginationItem>
        <div className="pagination-pages">
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index} className="page-link">
              {page === ELLIPSIS ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  className={cn("page-link", {
                    "page-link-active": page === currentPage,
                  })}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>
        <PaginationItem className="pagination-control next">
          <PaginationNext
            onClick={() => {
              if (!isLastPage) {
                handlePageChange(currentPage + 1);
              }
            }}
            className={cn(!isLastPage ? "control-button" : "control-disabled")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoinsPagination;
