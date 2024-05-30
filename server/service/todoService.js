import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery } from './queryItem.js'
export class TodoService {

    async getTodos(req) {
        let queryTodo, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryTodo = getItemByParamsQuery("todo", `id=?`)
        }
        else {
            let query = req.query;
            if (Object.entries(query).length === 0)
                queryTodo = getAllItemsQuery("todo");
            else {
                Object.keys(query).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(query[key])
                })
                queryTodo = getItemByParamsQuery("todo", conditionsParams.join(" AND "))
            }
        }
        console.log("query in get Todo " + queryTodo)
        const result = await query(queryTodo, [conditionsValues.toString()])
        return result;
    }

    async postTodo(body) {
        console.log(Object.values(body))
        let queryTodo = postItemQuery("todo", "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?" )
        console.log("query in post Todo" + queryTodo + Object.values(body))
        const result = await query(queryTodo, Object.values(body));
        return result;
    }

    async deleteTodo(value, params) {
        const queryTodo = deleteItemQuery("todo", params);
        console.log("query in delete" + queryTodo)
        const result = await query(queryTodo, [value])
        return result;
    }

    async updateTodo(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId" || key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryTodo = updateItemQuery("todo", stringToQuery);
        console.log("query in update Todo" + queryTodo)
        const result = await query(queryTodo, values)
        return result
    }
}








