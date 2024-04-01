import 'dotenv/config'

function getAllItemsQuery(tableName) {
    const query = `SELECT * FROM nodedb.${tableName}`;
    return query;
}

function getItemtByidQuery(tableName) {
    const query = `select * from nodedb.${tableName} where id=?`;
    return query;
}

function postItemQuery(tableName, repeat) {
    const query = `INSERT INTO nodedb.${tableName}  VALUES (${repeat})`;
    return query;
}

function deleteItemQuery(tableName) {
    const query = `DELETE FROM nodedb.${tableName} WHERE id=?`;
    return query;
}

function updateItemQuery(tableName, stringToQuery) {
    const query = `UPDATE nodedb.${tableName} SET ${stringToQuery}  WHERE id = ?`;
    return query;
}

export {
    getAllItemsQuery,
    getItemtByidQuery,
    postItemQuery,
    deleteItemQuery,
    updateItemQuery
}