import 'dotenv/config'

function getAllItemsQuery(tableName) {
    const query = `SELECT * FROM nodedb.${tableName} where isActive`;
    return query;
}

function getItemByParamsQuery(tableName,whereConditions) {
    const query = `select * from nodedb.${tableName} where ${whereConditions} and isActive`;
    return query;
}

function postItemQuery(tableName, repeat) {
    const query = `INSERT INTO nodedb.${tableName} VALUES (${repeat},true) `;
    return query;
}

function deleteItemQuery(tableName,params) {
    const query = `UPDATE nodedb.${tableName} SET isActive = 0 WHERE ${params} = ?`;
    return query;
}

function updateItemQuery(tableName, stringToQuery) {
    const query = `UPDATE nodedb.${tableName} SET ${stringToQuery}  WHERE id = ? and isActive`;
    return query;
}


function getPasswordQuery() {
    const query =`SELECT password FROM nodedb.userpassword where id=(select id from nodedb.user where username= ? and isActive)`
    return query;
}



function getItemsByPageQuery(tableName,offset) {
    const query = `SELECT * FROM nodedb.${tableName} where albumId=? and isActive LIMIT 10  ${offset} `;
    return query;
}

function getCountOfItemsQuery(tableName){
    const query=`select count(id) as count from nodedb.${tableName}`
    return query;
}

export {
    getCountOfItemsQuery,
    getItemsByPageQuery,
    getPasswordQuery,
    getAllItemsQuery,
    postItemQuery,
    getItemByParamsQuery,
    deleteItemQuery,
    updateItemQuery
}