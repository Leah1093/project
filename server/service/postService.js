import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery ,deleteItemQuery, updateItemQuery, getItemByParamsQuery } from './queryItem.js'
export class PostService {

    async getPosts(req) {
        let queryPost, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryPost = getItemByParamsQuery("post", `id=?`)
        }
        else {
            let query = req.query;
            if (Object.entries(query).length === 0)
                queryPost = getAllItemsQuery("post");
            else {
                Object.keys(query).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(query[key])
                })
                queryPost = getItemByParamsQuery("post", conditionsParams.join(" AND "))
            }
        }
        console.log("query in get Post " + queryPost)
        const result = await query(queryPost, [conditionsValues.toString()])
        return result;
    }

    async postPost(body) {
        console.log(Object.values(body))
        let queryPost = postItemQuery("post", "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?")
        console.log("query in post Post" + queryPost + Object.values(body))
        const result = await query(queryPost, Object.values(body));
        return result;
    }

    async deletePost(value, params) {
        const queryPost = deleteItemQuery("post", params);
        console.log("query in delete" + queryPost)
        const result = await query(queryPost, [value])
        return result;
    }

    async updatePost(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId" || key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryPost = updateItemQuery("post", stringToQuery);
        console.log("query in update Post" + queryPost)
        const result = await query(queryPost, values)
        return result
    }
}








