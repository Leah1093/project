import 'dotenv/config'
import { query } from './db.js'
import{getAllUsersQuery,getUsertByidQuery,postUserQuery,deleteUserQuery,updateUserQuery}from'./queryUser.js'
 const tableName='user';
export class UserService {
   
    async getAllUsers() {
        
        const queryUser=getAllUsersQuery(tableName);
        const result = await query(queryUser);
        return result;
    }

    async getUsertByid(id) {
        const queryUser=getUsertByidQuery(tableName);
        const result = await query(queryUser, [id]);
        return result;
    }



    // function updateQuery(table, objectKeys) {
    //     let stringToQuery = "";
    //     objectKeys.forEach(key => { stringToQuery += key += "=?," });
    //     stringToQuery= stringToQuery.slice(0, -1);
    //     return `UPDATE db_project.${table} SET ${stringToQuery}  WHERE id = ?`;
    // }

    
// async addUser(user) {
//     const queryUser = addQuery("users","?,".repeat((Object.keys(user).length)-1)+"?");
//     const result = await executeQuery(queryUser, Object.values(user));
//     return result;
// }
    
    async postUser(user) {
        let columnsName="";
        let repeat="";
        repeat+=("?,".repeat(user.key())+"?");
        console.log("💋💋💋"+repeat+)
        const queryUser=postUserQuery(tableName,columnsName,repeat);

        const result = await query( queryUser,[user.id, user.name, user.username, user.email, user.phone])
        return result;
    }

    async deleteUser(id) {
        const queryUser=deleteUserQuery(tableName);
        const result = await query( queryUser,[id])
        return result;
    }

    async updateUser(user) {
        const queryUser=updateUserQuery(tableName);
        const result = await query( queryUser,[user.name, user.username, user.email, user.phone,user.id])
        return result;
    }
}