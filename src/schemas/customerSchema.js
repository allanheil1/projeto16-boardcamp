import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().pattern(/^[0-9]{10,11}$/),
    cpf: joi.string().required().pattern(/^[0-9]{11}$/),
    birthday: joi.string().required().pattern(/^\d{4}\-\d{2}\-\d{2}$/),
});

export default customerSchema;