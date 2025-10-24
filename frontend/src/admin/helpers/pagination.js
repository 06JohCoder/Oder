

function PaginationHelper({totalPages,page,setPage}) {


    return (
        <div className="admin-pagination">
            <button
                className="admin-btn"
                onClick={() => setPage(page - 1)}
                style={{ display: page === 1 ? "none" : "" }}
            >
                Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
                className="admin-btn"

                style={{display: page === totalPages ? "none" : "" }}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
        </div>
    )

}

export default PaginationHelper;