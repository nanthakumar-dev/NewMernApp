class ApiFeatures {
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
       

    }
   /*async search(){
    const keyword=this.queryStr.keyword?{name:{$regex:this.queryStr.keyword,$options:'i'}}:{}
    const product=await this.query.find(keyword)
    this.query=product
    return this
   }*/
   search(){
    let keyword=this.queryStr.keyword?{name:{$regex:this.queryStr.keyword,$options:'i'}}:{}
    this.query.find(keyword)
    return this
}
filter(){
    let queryStrCopy={...this.queryStr}
    const filterItem=["keyword","limit","page"]
    filterItem.forEach(val=>delete queryStrCopy[val])
    this.query.find(queryStrCopy)
    return this
}

   page(resPerPage){
    const currentPage=this.queryStr.page||1;
    const skip=resPerPage*(currentPage-1)
    this.query.limit(resPerPage).skip(skip)
    return this
   }
}
module.exports=ApiFeatures