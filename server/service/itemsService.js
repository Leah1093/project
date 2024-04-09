import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, getItemsByPageQuery, getCountOfItemsQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery, getPasswordQuery } from './queryItem.js'
let tableName;
export class ItemService {

    constructor(name) {
        console.log(`the table name is: ${name}`)
        tableName = name;
    }

    async getCountOfItems() {
        let queryItem;
        queryItem = getCountOfItemsQuery(tableName);
        console.log("query in get item " + queryItem);
        const result = await query(queryItem);
        return result;
    }
  
    async getItemsByPage(req) {
        let queryItem;
        let offset = (req.query.page - 1) * 10;
        queryItem = getItemsByPageQuery(tableName,`OFFSET ${offset}`)
        console.log("query in get item " + queryItem);
        const result = await query(queryItem, [req.query.albumId]);
        return result;
    }

    async getItems(req) {
        console.log("function get items")
        let queryItem, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryItem = getItemByParamsQuery(tableName, `id=?`)
        }
        else {
            let querry = req.query;
            if (Object.entries(querry).length === 0)
                queryItem = getAllItemsQuery(tableName);
            else {
                Object.keys(querry).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(querry[key])
                })
                queryItem = getItemByParamsQuery(tableName, conditionsParams.join(" AND "))
            }
        }
        console.log("query in get item " + queryItem)
        const result = await query(queryItem, [conditionsValues.toString()])
        return result;
    }

    async postItem(body) {
        console.log("function post item")
        let queryItem;
        console.log("😅😅h")
        console.log(Object.values(body))
        queryItem = postItemQuery(tableName, tableName != "userpassword" ? "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?" : "?,".repeat(Object.keys(body).length - 1) + "?")
        console.log("query in post item" + queryItem + Object.values(body))
        const result = await query(queryItem, Object.values(body));
        return result;
    }

    async deleteItem(value,params) {
        console.log("function delete")
        const queryItem = deleteItemQuery(tableName,params);
        console.log("query in delete" + queryItem)
        const result = await query(queryItem, [value])
        return result;
    }

    async password(username) {
        console.log("function password")
        let queryItem = getPasswordQuery()
        console.log("query in password" + queryItem)
        const result = await query(queryItem, [username]);
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
        console.log("query in update item" + queryItem)
        const result = await query(queryItem, values)
        return result
    }
}








