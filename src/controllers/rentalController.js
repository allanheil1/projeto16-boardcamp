import connection from '../database.js';
import dayjs from 'dayjs';
import { STATUS_CODE } from '../statusCode.js';

async function getRentals(req, res){
    try{

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function postRentals(req, res){

    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs().format('YYYY-MM-DD');

    try{

        const pricePerDay = await connection.query(
            `SELECT games."pricePerDay" FROM games WHERE id = $1`,
            [gameId]
        );

        const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented;

        await connection.query(
            `INSERT INTO rentals ("customerId, "gameId, "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, rentDate, daysRented, NULL, originalPrice, NULL]
        );

        res.sendStatus(STATUS_CODE.CREATED);

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