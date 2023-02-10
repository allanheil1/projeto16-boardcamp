import connection from '../database.js';
import { STATUS_CODE } from '../statusCode.js';

async function getCustomers(req, res){
    try{
        const response = await connection.query(
            `SELECT * FROM customers`
        );

        return res.send(response.rows);

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function postCustomers(req, res){

    const { name, phone, cpf, birthday } = req.body;

    try{

        await connection.query(
            `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]
        );

        return res.sendStatus(STATUS_CODE.CREATED);

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function getCustomersId(req, res){

    const { id } = req.params;

    try{

        const response = await connection.query(
            `SELECT * FROM customers WHERE id=$1`,
            [id]
        );

        if(response.rowCount > 0){
            res.send(response.rows);
        }else{
            res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function updateCustomers(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { getCustomers, postCustomers, getCustomersId, updateCustomers }