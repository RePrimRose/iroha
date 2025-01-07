export const getPageNumbers = (totalPages, currentPage) => {
    const maxPagesToShow = 5; // 한 번에 보여줄 최대 페이지 수
    const halfRange = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (endPage - startPage + 1 < maxPagesToShow) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};
