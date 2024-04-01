import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, getItemtByidQuery, postItemQuery, deleteItemQuery, updateItemQuery } from './queryItem.js'
let tableName;
export class ItemService {
    constructor(name) {
        tableName = name;
    }

    // async getAoutoId(){
    //     const queryItem = getAoutoIdQuery(tableName);
    //     const result = await query(queryItem);
    //     return result;
    // }

    async getAllItems() {
        const queryItem = getAllItemsQuery(tableName);
        const result = await query(queryItem);
        return result;
    }

    async getItemByid(id) {
        const queryItem = getItemtByidQuery(tableName);
        const result = await query(queryItem, [id]);
        return result;
    }

    async postItem(body) {
        console.log("🎈🎈" + Object.keys(body));
        let queryItem;
        tableName == "user" ? queryItem = postItemQuery(tableName, "?,".repeat(Object.keys(body).length - 1) + "?")
            : queryItem = postItemQuery(tableName, "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?");
        const result = await query(queryItem, Object.values(body))
        return result;
    }

    async deleteItem(id) {
        const queryItem = deleteItemQuery(tableName);
        const result = await query(queryItem, [id])
        return result;
    }

    async updateItem(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { key != "id" && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body).slice(1);
        values.push(id);
        const queryItem = updateItemQuery(tableName, stringToQuery);
        const result = await query(queryItem, values)
        return result;
    }
}