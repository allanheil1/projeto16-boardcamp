import { Router } from "express";
import { getGames, postGames } from "../controllers/gameController.js";
import { validateGame } from "../middlewares/gameValidation.js";

const gameRouter = Router();
gameRouter.get("/games", getGames);
gameRouter.post("/games", validateGame, postGames);

export default gameRouter;