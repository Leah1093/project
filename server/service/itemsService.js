import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery ,getPasswordQuery} from './queryItem.js'
let tableName;
export class ItemService {
    constructor(name) {
        tableName = name;
    }
//לשנות שהפונקציות שלQUERY לא תקבל ערכים ורק פונקציה מDB תקבך
    // async getAoutoId(){
    //     const queryItem = getAoutoIdQuery(tableName);
    //     const result = await query(queryItem);
    //     return result;
    // }





    // async getAllItems() {
    //     const queryItem = getAllItemsQuery(tableName);
    //     const result = await query(queryItem);
    //     return result;
    // }

    // async getItemByid(id) {
    //     const queryItem = getItemtByidQuery(tableName);
    //     const result = await query(queryItem, [id]);
    //     return result;
    // }

    // async getItemByUserId(userId) {
    //     const queryItem = getItemtByUserIdQuery(tableName);
    //     const result = await query(queryItem, [userId]);
    //     return result;
    // }

    async getItems(req) {
        let queryItem;
        if (req.params.id) {
            queryItem = getItemByParamsQuery(tableName, `id=${req.params.id}`)
        }
        else {
            let querry = req.query;
            if (Object.entries(querry).length === 0)
                queryItem = getAllItemsQuery(tableName);
            else {
                const whereConditions = Object.keys(querry).map((key) => {
                    return `${key} = '${(querry[key])}'`;
                });
                queryItem = getItemByParamsQuery(tableName, whereConditions.join(" AND "))
            }
        }
        console.log(queryItem)
        const result = await query(queryItem);
        return result;
    }

    async postItem(body) {
        let queryItem;
        tableName == "user" ? queryItem = postItemQuery(tableName, "?,".repeat(Object.keys(body).length - 1) + "?")
            : queryItem = postItemQuery(tableName, "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?")
        const result = await query(queryItem, Object.values(body))
        return result;
    }

    async deleteItem(id) {
        const queryItem = deleteItemQuery(tableName);
        const result = await query(queryItem, [id])
        return result;
    }
    async password(username){
      let queryItem=getPasswordQuery(username)
        const result = await query(queryItem);
        return result;
    }
    async updateItem(body, id) {
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "userId"||key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values =Object.values(body);
        values.push(id);
        console.log("🎈🎈🎈"+stringToQuery);
        console.log("🎈🎈🎈"+values);
        const queryItem = updateItemQuery(tableName, stringToQuery);
        const result = await query(queryItem, values)
        return result
    }
}



// async getItems(req) {
//     console.log("✨");
//     let queryItem;
//     let flag = false;
//     if (req.params.id) {
//         queryItem = getItemByParamsQuery(tableName, `id=${req.params.id}`)
//     }
//     else {
//         console.log(tableName + "🎟🎠")
//         console.log("✨");
//         let querry = req.query;
//         if (tableName!= "userpassword"&&Object.entries(querry).length === 0)
//             queryItem = getAllItemsQuery(tableName);
//         else {
//             if (tableName == "userpassword") {
//                 console.log("✨"+req.password);
//                 queryItem = getItemByParamsQuery(tableName, `password=${req.password} AND id=${req.id}`);
//             }
//             else {
//                 let whereConditions = Object.keys(querry).map((key) => {
//                     return (key != 'password') ? `${key} = '${(querry[key])}'` : flag = true
//                 })
//                 flag && (whereConditions = whereConditions.slice(0, -1))
//                 console.log("🎃✨" + whereConditions);
//                 queryItem = getItemByParamsQuery(tableName, whereConditions.join(" AND "))
//             }


//         }
//     }
//     console.log(queryItem)
//     const result = await query(queryItem);
//     return result;
// }