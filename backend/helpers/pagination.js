module.exports = (objPagination, query, countProducts) => {
    if (query.page) {
        objPagination.pagePage = parseInt(query.page);
    }
    objPagination.skip = (objPagination.pagePage - 1) * objPagination.limitItems;

    const totalPages = Math.ceil(countProducts / objPagination.limitItems);
    objPagination.totalPages = totalPages
    return objPagination; 
};


