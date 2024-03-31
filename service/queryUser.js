import 'dotenv/config'
import { query } from './db.js'

// async function getColumns(tableName) {
//     const query1 = await query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME ='${tableName}' and TABLE_SCHEMA='nodedb'`)
//     let columnsName = [];
//     query1.forEach(c => columnsName.push(c.COLUMN_NAME));
//     console.log("columns name of table"+columnsName);
//     return columnsName;
// }


function getAllUsersQuery(tableName) {
    const query = `SELECT * FROM nodedb.${tableName}`;
    return query;
}

function getUsertByidQuery(tableName) {
    const query = `select * from nodedb.${tableName} where id=?`;
    return query;
}

function postUserQuery(tableName,columnsnName,repeat) {
    // let columnsArr = getColumns(tableName);
    const query = `INSERT INTO nodedb.${tableName} (${columnsnName}) VALUES (${repeat})`;
    return query;
}

function deleteUserQuery(tableName) {
    const query = `DELETE FROM nodedb.${tableName} WHERE id=?`;
    return query;
}

function updateUserQuery() {
    const query = `UPDATE nodedb.user SET name = ?, username= ?, email= ?, phone = ? WHERE (id = ?) `;
    return query;
}

export {
    getAllUsersQuery,
    getUsertByidQuery,
    postUserQuery,
    deleteUserQuery,
    updateUserQuery
}