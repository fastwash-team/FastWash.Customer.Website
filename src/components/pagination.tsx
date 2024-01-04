import ReactPaginate from "react-paginate";

export function Pagination() {
  const handlePageClick = () => {
    return;
  };
  const pageCount = 23;
  return (
    <div className='pagination-container'>
      <p>Items per page</p>
      <select className='form-select'>
        <option>99</option>
        <option>100</option>
      </select>
      <ReactPaginate
        className='pagination-numbers'
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel={"<"}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}