import 'dotenv/config'

function getAllItemsQuery(tableName) {
    const query = `SELECT * FROM nodedb.${tableName} where isActive`;
    return query;
}

// function getItemtByidQuery(tableName) {
//     const query = `select * from nodedb.${tableName} where id=? and isActive`;
//     return query;
// }

// function getItemtByUserIdQuery(tableName) {
//     const query = `select * from nodedb.${tableName} where userId=? and isActive`;
//     return query;
// }

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

export {
    getAllItemsQuery,
    postItemQuery,
    getItemByParamsQuery,
    deleteItemQuery,
    updateItemQuery
}