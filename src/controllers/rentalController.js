import connection from '../database.js';
import dayjs from 'dayjs';
import { STATUS_CODE } from '../statusCode.js';

async function getRentals(req, res){

    try{

        const rentals = await connection.query(
            `
            SELECT 
                rentals.*,
                customers.name AS "customerName",
                customers.id AS "customerId",
                games.id AS "gameId",
                games.name AS "gameName"
            FROM 
                rentals 
                JOIN customers ON rentals."customerId" = customers.id
                JOIN games ON games.id = rentals."gameId"
            `
        );

        const getRentalsResponse = rentals.rows.map((rental) => { 
            const rentalObject = { 
                ...rental,
                rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName
                }
            };

            delete rentalObject.customerName;
            delete rentalObject.gameName;
    
            return rentalObject;

        });

        return res.send(getRentalsResponse);

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
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
        );

        res.sendStatus(STATUS_CODE.CREATED);

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function concludeRentals(req, res){

    const { id } = req.params;

    const returnDate = dayjs().format('YYYY-MM-DD');

    const rentDate = req.locals.rentDate;
    const daysRented = parseInt(req.locals.daysRented);

    try{

        const queryResult = await connection.query(
            `
                SELECT
                    rentals.*,
                    games."pricePerDay" AS "pricePerDay"
                FROM
                    rentals
                    JOIN games ON games.id = rentals."gameId"
                WHERE
                    rentals.id = $1
            `,
            [id]
        );

        const numberOfDelayedDays = dayjs().diff(dayjs(rentDate).add(daysRented, 'day'), 'day');

        const delayFee = numberOfDelayedDays > 0 ? parseInt(numberOfDelayedDays) * queryResult.rows[0].pricePerDay : 0;

        await connection.query(
            `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id=$3`,
            [returnDate, delayFee, id]
        );

        return res.sendStatus(STATUS_CODE.OK);

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function deleteRentals(req, res){

    const { id } = req.params;

    try{

        const queryResult = await connection.query(
            `SELECT * FROM rentals WHERE id = $1`,
            [id]
        );

        if(queryResult.rowCount === 0){
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        await connection.query(
            `DELETE FROM Rentals WHERE id = $1`,
            [id]
        );

        return res.sendStatus(STATUS_CODE.OK);

    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { getRentals, postRentals, concludeRentals, deleteRentals }