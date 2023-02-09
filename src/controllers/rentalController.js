import connection from '../database.js';
import { STATUS_CODE } from '../statusCode.js';

async function getRentals(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function postRentals(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function concludeRentals(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function deleteRentals(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { getRentals, postRentals, concludeRentals, deleteRentals }