import 'dotenv/config'
import { query } from './db.js'

async function getAllUsers() {
    const result = await query('SELECT * FROM nodedb.user ');
    return result;
}

async function getUsertByid(id) {
    const result = await query('select * from nodedb.user where id=?',[id]);
    return result;
}

export {
    getAllUsers,
    getUsertByid
}
