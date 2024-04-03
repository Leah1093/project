import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery, getPasswordQuery } from './queryItem.js'
let tableName;
export class ItemService {
    constructor(name) {
        tableName = name;
    }
    //לשנות שהפונקציות שלQUERY לא תקבל ערכים ורק פונקציה מDB תקבך
    async getItems(req) {
        console.log("function get items")
        let queryItem;
        if (req.params.id) {
            queryItem = getItemByParamsQuery(tableName, `id=${req.params.id}`)
        }
        else {
            let querry = req.query;
            if (Object.entries(querry).length === 0)
                queryItem = getAllItemsQuery(tableName);
            else {
                let whereConditions = Object.keys(querry).map((key) => { 
                    return (key!="page")?  `${key} = '${(querry[key])}'`:null;
                });

                queryItem = getItemByParamsQuery(tableName, whereConditions.join(" AND "))
            }
        }
        console.log("query in get item"+queryItem)
        const result = await query(queryItem);
        return result;
    }

    async postItem(body) {
        console.log("function post item")
        let queryItem;
        queryItem = postItemQuery(tableName, "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?")
        console.log("query in post item"+queryItem)
        const result = await query(queryItem, Object.values(body))
        return result;
    }

    async deleteItem(id) {
        console.log("function delete item")
        const queryItem = deleteItemQuery(tableName);
        console.log("query in delete item"+queryItem)
        const result = await query(queryItem, [id])
        return result;
    }
    
    async password(username) {
        console.log("function password")
        let queryItem = getPasswordQuery(username)
        console.log("query in password"+queryItem)
        const result = await query(queryItem);
        return result;
    }

    async updateItem(body, id) {
        console.log("function update item")
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId" || key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryItem = updateItemQuery(tableName, stringToQuery);
        console.log("query in update item"+queryItem)
        const result = await query(queryItem, values)
        return result
    }
}