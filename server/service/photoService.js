import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, getItemsByPageQuery, getCountOfItemsQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery, getPasswordQuery } from './queryItem.js'
export class PhotoService {

    async getCountOfPhotos() {
        let queryPhoto;
        queryPhoto = getCountOfItemsQuery("photo");
        console.log("query in get Photo " + queryPhoto);
        const result = await query(queryPhoto);
        return result;
    }

    async getPhotosByPage(req) {
        let queryPhoto;
        let offset = (req.query.page - 1) * 10;
        queryPhoto = getItemsByPageQuery("photo", `OFFSET ${offset}`)
        console.log("query in get Photo " + queryPhoto);
        const result = await query(queryPhoto, [req.query.albumId]);
        return result;
    }

    async getPhotos(req) {
        let queryPhoto, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryPhoto = getItemByParamsQuery("photo", `id=?`)
        }
        else {
            let query = req.query;
            if (Object.entries(query).length === 0)
                queryPhoto = getAllItemsQuery("photo");
            else {
                Object.keys(query).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(query[key])
                })
                queryPhoto = getItemByParamsQuery("photo", conditionsParams.join(" AND "))
            }
        }
        console.log("query in get Photo " + queryPhoto)
        const result = await query(queryPhoto, [conditionsValues.toString()])
        return result;
    }

    async postPhoto(body) {
        console.log(Object.values(body))
        let queryPhoto = postItemQuery("photo", "photo" != "userpassword" ? "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?" : "?,".repeat(Object.keys(body).length - 1) + "?")
        console.log("query in post Photo" + queryPhoto + Object.values(body))
        const result = await query(queryPhoto, Object.values(body));
        return result;
    }

    async deletePhoto(value, params) {
        const queryPhoto = deleteItemQuery("photo", params);
        console.log("query in delete" + queryPhoto)
        const result = await query(queryPhoto, [value])
        return result;
    }

    async updatePhoto(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId" || key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryPhoto = updateItemQuery("photo", stringToQuery);
        console.log("query in update Photo" + queryPhoto)
        const result = await query(queryPhoto, values)
        return result
    }
}








