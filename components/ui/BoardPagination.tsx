import Link from "next/link";
import React from "react";
import styles from "../../styles/components/BoardPagination.module.scss";

interface BoardPaginationProps {
  pages: number;
  currentPage: number;
  boardAlias: string;
}

export default function BoardPagination({
  pages,
  currentPage,
  boardAlias,
}: BoardPaginationProps) {
  return (
    <ul className={styles.pagination}>
      {Array.from(Array(pages).keys()).map((page) => {
        page++;
        return (
          <Link key={page} href={`/board/${boardAlias}?page=${page}`}>
            <a className={currentPage === page ? styles["active-page"] : ""}>
              {page}
            </a>
          </Link>
        );
      })}
    </ul>
  );
}
