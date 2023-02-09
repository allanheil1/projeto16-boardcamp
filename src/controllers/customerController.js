import connection from '../database.js';
import { STATUS_CODE } from '../statusCode.js';

async function getCustomers(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function postCustomers(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function getCustomersId(req, res){
    try{

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