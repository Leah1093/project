import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery } from './queryItem.js'

export class AlbumService {

    async getAlbums(req) {
        let queryAlbum, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryAlbum = getItemByParamsQuery("album", `id=?`)
        }
        else {
            let query = req.query;
            if (Object.entries(query).length === 0)
                queryAlbum = getAllItemsQuery("album");
            else {
                Object.keys(query).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(query[key])
                })
                queryAlbum = getItemByParamsQuery("album", conditionsParams.join(" AND "))
            }
        }
        console.log("query in get Album " + queryAlbum)
        const result = await query(queryAlbum, [conditionsValues.toString()])
        return result;
    }

    async postAlbum(body) {
        console.log(Object.values(body))
        let queryAlbum = postItemQuery("album",  "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?")
        console.log("query in post Album" + queryAlbum + Object.values(body))
        const result = await query(queryAlbum, Object.values(body));
        return result;
    }

    async deleteAlbum(value, params) {
        const queryAlbum = deleteItemQuery("album", params);
        console.log("query in delete" + queryAlbum)
        const result = await query(queryAlbum, [value])
        return result;
    }

    async updateAlbum(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId" || key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryAlbum = updateItemQuery("album", stringToQuery);
        console.log("query in update Album" + queryAlbum)
        const result = await query(queryAlbum, values)
        return result
    }
}








