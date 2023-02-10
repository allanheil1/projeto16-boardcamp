import connection from '../database.js';
import { STATUS_CODE } from '../statusCode.js';

async function getGames(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function postGames(req, res){

    const {name, image, stockTotal, pricePerDay} = req.body;

    try{

        await connection.query
            (`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, 
            [name, image, stockTotal, pricePerDay]
        );

        res.sendStatus(STATUS_CODE.CREATED);

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { getGames, postGames }