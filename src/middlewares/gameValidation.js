import connection from '../database.js';
import gameSchema from '../schemas/gameSchema.js';
import { STATUS_CODE } from '../statusCode.js';

async function validateGame(req, res, next){
    
    const { name, stockTotal, pricePerDay } = req.body;
    
    const isValid = gameSchema.validate(req.body);

    if (isValid.error){
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    if(stockTotal <= 0 || pricePerDay <= 0){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    try{

        const nameExists = await connection.query(
            `SELECT * FROM games WHERE name=$1`,
            [name]
        );

        if(nameExists.rowCount > 0){
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }

        next();

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { validateGame };