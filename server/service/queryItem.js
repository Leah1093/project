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

function deleteItemQuery(tableName) {
    const query = `UPDATE nodedb.${tableName} SET isActive = 0 WHERE (id = ?)`;
    return query;
}

function updateItemQuery(tableName, stringToQuery) {
    const query = `UPDATE nodedb.${tableName} SET ${stringToQuery}  WHERE id = ? and isActive`;
    return query;
}

function getPasswordQuery(params) {
    const query =`SELECT password FROM nodedb.userpassword where id=(select id from nodedb.user where username= '${params}' and isActive)`
    return query;
}

export {
    getPasswordQuery,
    getAllItemsQuery,
    postItemQuery,
    getItemByParamsQuery,
    deleteItemQuery,
    updateItemQuery
}