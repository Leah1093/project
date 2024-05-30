import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery, getPasswordQuery } from './queryItem.js'
let tableName;
export class UserService {
    constructor(name) {
        console.log(`the table name is: ${name}`)
        tableName = name;
    }

    async getUsers(req) {
        let queryUser, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryUser = getItemByParamsQuery(tableName, `id=?`)
        }
        else {
            let query = req.query;
            if (Object.entries(query).length === 0)
                queryUser = getAllItemsQuery(tableName);
            else {
                Object.keys(query).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(query[key])
                })
                queryUser = getItemByParamsQuery(tableName, conditionsParams.join(" AND "))
            }
        }
        console.log("query in get User " + queryUser)
        const result = await query(queryUser, [conditionsValues.toString()])
        return result;
    }

    async postUser(body) {
        console.log(Object.values(body))
        let queryUser = postItemQuery(tableName, tableName != "userpassword" ? "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?" : "?,".repeat(Object.keys(body).length - 1) + "?")
        console.log("query in post User" + queryUser + Object.values(body))
        const result = await query(queryUser, Object.values(body));
        return result;
    }

    async deleteUser(value, params) {
        const queryUser = deleteItemQuery(tableName, params);
        console.log("query in delete" + queryUser)
        const result = await query(queryUser, [value])
        return result;
    }

    async password(username) {
        let queryUser = getPasswordQuery()
        console.log("query in password" + queryUser)
        const result = await query(queryUser, [username]);
        return result;
    }

    async updateUser(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId" || key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryUser = updateItemQuery(tableName, stringToQuery);
        console.log("query in update User" + queryUser)
        const result = await query(queryUser, values)
        return result
    }
}








