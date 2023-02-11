import connection from '../database.js';
import rentalSchema from '../schemas/rentalSchema.js';
import { STATUS_CODE } from '../statusCode.js';

async function validateRental(req, res, next){

    const { customerId, gameId, daysRented } = req.body;

    const isValid = rentalSchema.validate(req.body);

    if(isValid.error){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    try{

        if(daysRented <= 0 || gameId <= 0 || customerId <= 0){
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        const gameExists = await connection.query(
            `SELECT * FROM games WHERE id = $1`,
            [gameId]
        );

        const gameStockTotal = gameExists.rows[0].stockTotal;

        if(gameExists.rowCount === 0){
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        const customerExists = await connection.query(
            `SELECT * FROM customers WHERE id = $1`,
            [customerId]
        );

        if(customerExists.rowCount === 0){
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        const gameRentals = await connection.query(
            `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
            [gameId]
        );

        if(gameStockTotal - gameRentals.rowCount === 0){
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        next();

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
    
}

async function validateRentalId(req, res, next){

    const { id } = req.params;

    try{

        const rentalExists = await connection.query(
            `SELECT * FROM rentals WHERE id = $1`,
            [id]
        );

        console.log(rentalExists.rows[0]);

        if(rentalExists.rowCount === 0){
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        if(req.method === 'POST'){
            if(rentalExists.rows[0].returnDate !== null){
                return res.sendStatus(STATUS_CODE.BAD_REQUEST);
            }
        }else{
            if(rentalExists.rows[0].returnDate === null){
                return res.sendStatus(STATUS_CODE.BAD_REQUEST);
            }  
        }

        
        req.locals = rentalExists.rows[0];

        next();

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { validateRental, validateRentalId };