import connection from '../database.js';
import { STATUS_CODE } from '../statusCode.js';

async function getGames(req, res){

    const name = req.query.name;

    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function postGames(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { getGames, postGames }