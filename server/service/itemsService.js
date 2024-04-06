import 'dotenv/config'
import { query } from './db.js'
import { getAllItemsQuery, postItemQuery, deleteItemQuery, updateItemQuery, getItemByParamsQuery, getPasswordQuery } from './queryItem.js'
let tableName;
export class ItemService {

    constructor(name) {
        console.log(`the table name is: ${name}`)
        tableName = name;
    }
    
    async getItems(req) {
        console.log("function get items")
        let queryItem, conditionsParams = [], conditionsValues = [];
        if (req.params.id) {
            console.log("1")
            conditionsValues = req.params.id;
            queryItem = getItemByParamsQuery(tableName, `id=?`)
        }
        else {
            console.log("2")
            let querry = req.query;
            if (Object.entries(querry).length === 0)
                queryItem = getAllItemsQuery(tableName);
            else {
                console.log("3")
                Object.keys(querry).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(querry[key])
                    console.log(querry[key])
                    console.log(key)
                })
                queryItem = getItemByParamsQuery(tableName, conditionsParams.join(" AND "))
            }
        }
        console.log("query in get item " + queryItem)
        const result = await query(queryItem, [conditionsValues.toString()]);
        return result;
    }



    async postItem(body) {
        console.log("function post item")
        let queryItem;
        queryItem = postItemQuery(tableName, tableName != "userpassword" ? "NULL," + "?,".repeat(Object.keys(body).length - 1) + "?" : "?,".repeat(Object.keys(body).length - 1) + "?")
        console.log("query in post item" + queryItem + Object.values(body))
        const result = await query(queryItem, Object.values(body))
        return result;
    }

    // async registerService(body) {
    //     console.log(Object.values(body)+"function register Service")
    //     let queryItem;
    //     queryItem = registerQuery()
    //     console.log("query in post item" + queryItem)
    //     let arr=Object.values(body);

    //     const result = await query(queryItem, [Object.values(body)])
    //     return result;
    // }

    async deleteItem(id) {
        console.log("function delete item")
        const queryItem = deleteItemQuery(tableName);
        console.log("query in delete item" + queryItem)
        const result = await query(queryItem, [id])
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










// const getPhotos = () => {

//     setTimeout(() => {
//       fetch(`http://localhost:8086/photo?albumId=${parseInt(albumId)}&&page=${page}`)
//         .then(async response => {
//           const data = await response.json();
//           if (response.ok) {
//             first ? setItems(prevItems => [...prevItems, ...(data)]) : setItems(data);
//             setPage(data+1);
//             setHasMore(data.next != null);
//           }
//         })
//     }, 400);
//   };



// async getPhotoss(req) {
//     console.log("😅😅"+req.query.albumId)
//     let queryItem;
//     let offset=(req.query.page-1)*10;
//     queryItem = getAllPhotoisQuery(`OFFSET ${offset}`)
//     console.log("query in get item " + queryItem)
    

//     const result = await query(queryItem, [req.query.albumId]);
//     return result;
// }
// function getAllPhotoisQuery(offset) {

//     const query = `SELECT * FROM nodedb.photo  where albumId=? and isActive LIMIT 10  ${offset} `;

//     return query;
// }

  
// async getPhotos(req, res, next) {
//     console.log("function get photos   "+req.query.albumId)
//     try {
//         const photoService = new ItemService("photo");
//         const resultItems = await photoService.getPhotoss(req)
//         return res.status(200).json(resultItems)
//     }
//     catch (ex) {
//         const err = {}
//         err.statusCode = 500;
//         err.message = ex;
//         next(err)
//     }
// }