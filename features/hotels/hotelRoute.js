import express from 'express'
import HotelController from './hotelController.js';
import authenticate from '../../middlewares/auth.middle.js';
import { validateCreateHotel, validateUpdateHotel } from '../../validator/hotelValidation.js';

const {
  createHotel,
  updatedHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType
} = new HotelController();

const hotelRoute = express.Router();

hotelRoute.post("/",validateCreateHotel, createHotel);
hotelRoute.put("/:id",authenticate,validateUpdateHotel, updatedHotel);
hotelRoute.delete("/:id",authenticate,deleteHotel);
hotelRoute.get("/:id",authenticate,getHotel);
hotelRoute.get("/",authenticate,getHotels);
hotelRoute.get("/countByCity",authenticate,countByCity);
hotelRoute.get("/room/:id",authenticate,countByType);

export default hotelRoute;