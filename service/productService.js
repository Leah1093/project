import 'dotenv/config'
import { query } from './db.js'

async function getAllProducts() {
    const result = await query('SELECT * FROM db_product.product ');
    return result;
}

async function getProductById(id) {
    const result = await query('SELECT * FROM db_product.product where id=?',[id]);
    return result;
}

export {
    getAllProducts,
    getProductById
}
