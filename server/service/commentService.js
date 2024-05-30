import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery } from './queryItem.js'
export class CommentService {


    async getComments(req) {
        let queryComment, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryComment = getItemByParamsQuery("comment", `id=?`)
        }
        else {
            let query = req.query;
            if (Object.entries(query).length === 0)
                queryComment = getAllItemsQuery("comment");
            else {
                Object.keys(query).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(query[key])
                })
                queryComment = getItemByParamsQuery("comment", conditionsParams.join(" AND "))
            }
        }
        console.log("query in get Comment " + queryComment)
        const result = await query(queryComment, [conditionsValues.toString()])
        return result;
    }

    async postComment(body) {
        console.log(Object.values(body))
        let queryComment = postItemQuery("comment", "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?" )
        console.log("query in post Comment" + queryComment + Object.values(body))
        const result = await query(queryComment, Object.values(body));
        return result;
    }

    async deleteComment(value, params) {
        const queryComment = deleteItemQuery("comment", params);
        console.log("query in delete" + queryComment)
        const result = await query(queryComment, [value])
        return result;
    }

    async updateComment(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId" || key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryComment = updateItemQuery("comment", stringToQuery);
        console.log("query in update Comment" + queryComment)
        const result = await query(queryComment, values)
        return result
    }
}








