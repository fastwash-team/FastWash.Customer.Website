import ReactPaginate from "react-paginate";

export function Pagination({
  pageCount = 23,
  pageSize = 10,
  currentPage = 1,
  changePageSize,
  changePage,
}: {
  pageCount?: number;
  pageSize?: number;
  currentPage?: number;
  changePage?: (el: number) => void;
  changePageSize?: (el: number) => void;
}) {
  const handlePageClick = ({ selected }: { selected: number }) => {
    if (changePage) return changePage(selected + 1);
  };

  console.log({ currentPage });

  return (
    <div className='pagination-container'>
      <p>Items per page</p>
      <select
        className='form-select'
        value={pageSize}
        onChange={({ target: { value } }) => {
          if (changePageSize) changePageSize(Number(value));
        }}
      >
        {[1, 2, 5, 10, 20, 30, 50, 100].map((el) => (
          <option value={el}>{el}</option>
        ))}
      </select>
      <ReactPaginate
        className='pagination-numbers'
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        forcePage={currentPage - 1 < 0 ? 0 : currentPage - 1}
        pageCount={pageCount}
        previousLabel={"<"}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
