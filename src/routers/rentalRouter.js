import { Router } from "express";
import {getRentals, postRentals, concludeRentals, deleteRentals} from "../controllers/rentalController.js";
import {validateRental, validateRentalId} from "../middlewares/rentalValidation.js";

const rentalRouter = Router();
rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", validateRental, postRentals);
rentalRouter.post("/rentals/:id/return", validateRentalId, concludeRentals);
rentalRouter.delete("/rentals/:id", validateRentalId, deleteRentals);

export default rentalRouter;