import connection from '../database.js';
import customerSchema from '../schemas/customerSchema.js';
import { STATUS_CODE } from '../statusCode.js';

async function validateCustomer(req, res, next){

    const { name, cpf } = req.body;

    const isValid = customerSchema.validate(req.body);

    if(isValid.error){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    if(name === ''){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    try{

        const cpfExist = await connection.query(
            `SELECT * FROM customers WHERE cpf=$1`,
            [cpf]
        );

        if(cpfExist.rowCount > 0){
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }

        next();
        
    } catch(error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { validateCustomer };