module.exports = (query) =>{
    let objSearch ={
        keyword:""
    }

    if (query.keyword){
        objSearch.keyword = query.keyword;
        const regex = new RegExp(objSearch.keyword,"i");
        objSearch.regex=regex
    }

    return objSearch;

}