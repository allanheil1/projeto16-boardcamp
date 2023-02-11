import { Router } from 'express';
import { getCustomers, postCustomers, getCustomersId, updateCustomers } from '../controllers/customerController.js';
import { validateCustomer, validateUpdateCustomer } from '../middlewares/customerValidation.js';

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomersId);
customerRouter.post("/customers", validateCustomer, postCustomers);
customerRouter.put("/customers/:id", validateUpdateCustomer, updateCustomers);

export default customerRouter;